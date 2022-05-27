using BaseProject.Authorization;
using BaseProject.Entities;
using BaseProject.Helpers;
using BaseProject.Models;
using Microsoft.Extensions.Options;
using AutoMapper;
using System.Security.Cryptography;

namespace BaseProject.Services
{
    public interface IAccountService
    {
        // authenticate
        public AuthenticateResponse Authenticate(AuthenticateRequest request, string ipAddress);
        public AuthenticateResponse RefreshToken(string token, string ipAddress);
        public AccountResponse Register(RegisterRequest request, string ipAddress);
        public void Verify(VerifyRequest verifyRequest);
        public void ForgotPassword(ForgotPasswordRequest request);
        public void ResetPassword(ResetPasswordRequest request);


        // CRUD
        public AccountResponse GetAccountById(int accountId);
        public IEnumerable<AccountResponse> GetAllAccounts();
        public AccountResponse Create(CreateRequest request);
        public AccountResponse Update(int Id, UpdateRequest request);
        public void Delete(int Id);

        public void VerifyNewLogin(NewLoginRequest request);
        public void ChangeTimeAliveToken(ChangeTimeAliveRequest request);
        public Account GetAccountId(int accountId);
    }

    public class AccountService : IAccountService
    {
        private readonly DataContext _context;
        private readonly JwtUtils _jwtUtils;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public AccountService(DataContext context, JwtUtils jwtUtils, IMapper mapper, IOptions<AppSettings> appSettings, IEmailService emailService)
        {
            _context = context;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _emailService = emailService;
        }

        // authenticate methods
        public AuthenticateResponse Authenticate(AuthenticateRequest request, string ipAddress)
        {
            var account = _context.Accounts.SingleOrDefault(x => x.Email == request.Email);

            if (account == null || !BCrypt.Net.BCrypt.Verify(request.Password, account.PasswordHash))
                throw new AppException("Username or Password is Incorrect");

            var ipAddressExists = (account.IpAddresses != null) ? account.IpAddresses.FirstOrDefault(x => x.Ip == ipAddress) : null;
            if (ipAddressExists == null)
            {
                account.NewLoginToken = generateRandomToken();
                account.NewLoginExpires = DateTime.UtcNow.AddMinutes(30);

                _context.Accounts.Update(account);
                _context.SaveChanges();

                sendWarningLogin(account, ipAddress);
                throw new AppException("Unknown login! Open your email and verify first");
            }

            var jwtToken = _jwtUtils.GenerateToken(account);
            var refreshToken = _jwtUtils.generateRefreshToken(ipAddress);
            account.RefreshTokens.Add(refreshToken);

            removeOldRefreshTokens(account);

            _context.Accounts.Update(account);
            _context.SaveChanges();

            var response = _mapper.Map<AuthenticateResponse>(account);
            response.RefreshToken = refreshToken.Token;
            response.JwtToken = jwtToken;
            return response;
        }

        public AuthenticateResponse RefreshToken(string token, string ipAddress)
        {
            var account = getAccountByRefreshToken(token);
            var refreshToken = account.RefreshTokens.Single(x => x.Token == token);

            if (refreshToken.IsRevoked)
            {
                // revoke all descendant tokens in case this token has been compromised
                revokeDescendantRefreshTokens(refreshToken, account, ipAddress);
                _context.Update(account);
                _context.SaveChanges();
            }

            if (!refreshToken.IsActive)
                throw new AppException("Invalid refresh token");

            // replace old refresh token with a new one (rotate token)
            var newRefreshToken = rotateRefreshToken(refreshToken, ipAddress);
            account.RefreshTokens.Add(newRefreshToken);


            // remove old refresh tokens from account
            removeOldRefreshTokens(account);

            // save changes to db
            _context.Update(account);
            _context.SaveChanges();

            // generate new jwt
            var jwtToken = _jwtUtils.GenerateToken(account);

            // return data in authenticate response object
            var response = _mapper.Map<AuthenticateResponse>(account);
            response.JwtToken = jwtToken;
            response.RefreshToken = newRefreshToken.Token;
            return response;
        }

        public void RevokeToken(string token, string ipAddress)
        {
            var account = getAccountByRefreshToken(token);
            var refreshToken = account.RefreshTokens.Single(x => x.Token == token);

            if (!refreshToken.IsActive)
                throw new AppException("Invalid token");

            // revoke token and save
            revokeRefreshToken(refreshToken, ipAddress);
            _context.Update(account);
            _context.SaveChanges();
        }

        public AccountResponse Register(RegisterRequest request, string ipAddress) 
        {
            var accountExists = getByEmail(request.Email);
            if (accountExists != null)
                throw new AppException("Email existed");

            var account = _mapper.Map<Account>(request);

            account.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            account.Role = account.Id == 1 ? Role.Admin : Role.User; // admin is the first created/registered account

            account.VerifyToken = generateRandomToken();
            
            // save the ipAddress which is used to register
            var newIp = new IpAddress { Ip = ipAddress };
            if (account.IpAddresses == null)
                account.IpAddresses = new List<IpAddress> { newIp };
            else
                account.IpAddresses.Add(newIp);

            _context.Accounts.Add(account);
            _context.SaveChanges();

            sendVerifyEmail(account);

            return _mapper.Map<AccountResponse>(account);
        }

        public void Verify(VerifyRequest verifyRequest)
        {
            var account = _context.Accounts.FirstOrDefault(x => x.VerifyToken == verifyRequest.Token);
            if (account == null)
                throw new AppException("Invalid token");

            account.VerifyToken = null;
            account.VerifyDate = DateTime.UtcNow;

            _context.Update(account);
            _context.SaveChanges();
        }

        public void ForgotPassword(ForgotPasswordRequest request)
        {
            var account = getByEmail(request.Email);
            if (account == null)
                throw new AppException("Email not found");

            account.ResetToken = generateRandomToken();
            account.ResetTokenExpires = DateTime.UtcNow.AddMinutes(30);

            _context.Update(account);
            _context.SaveChanges();

            sendForgotPassword(account);
        }

        public void ResetPassword(ResetPasswordRequest request)
        {
            var account = _context.Accounts.SingleOrDefault(x => x.ResetToken == request.Token);
            if (account == null || account.ResetTokenExpires < DateTime.UtcNow)
                throw new AppException("Invalid/Expired token");

            account.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            account.ResetToken = null;

            _context.Update(account);
            _context.SaveChanges();
        }

        public void VerifyNewLogin(NewLoginRequest request)
        {
            var account = _context.Accounts.SingleOrDefault(x => x.NewLoginToken == request.Token);
            if (account == null || account.NewLoginExpires < DateTime.UtcNow)
                throw new AppException("Invalid/Expired token");

            account.NewLoginToken = null;
            var newIp = new IpAddress { Ip = request.IpAddress };
            if (account.IpAddresses == null)
                account.IpAddresses = new List<IpAddress> { newIp };
            else 
                account.IpAddresses.Add(newIp);

            _context.Update(account);
            _context.SaveChanges();
        } 

        // CRUD methods
        public AccountResponse GetAccountById(int accountId)
        {
            var account = _context.Accounts.FirstOrDefault(x => x.Id == accountId);
            if (account == null) throw new KeyNotFoundException("Account not found");
            return _mapper.Map<AccountResponse>(account);
        }

        public IEnumerable<AccountResponse> GetAllAccounts()
        {
            var accounts = _context.Accounts;
            return _mapper.Map<IList<AccountResponse>>(accounts);
        }

        public Account GetAccountId(int accountId)
        {
            var account = _context.Accounts.FirstOrDefault(x => x.Id == accountId);
            if (account == null) throw new KeyNotFoundException("Account not found");
            return account;
        }

        public AccountResponse Create(CreateRequest request)
        {

            var accountExists = getByEmail(request.Email);
            if (accountExists != null)
                throw new AppException("Email existed");

            var account = _mapper.Map<Account>(request);

            account.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            account.Role = account.Id == 1 ? Role.Admin : Role.User; // admin is the first created/registered account

            _context.Accounts.Add(account);
            _context.SaveChanges();

            return _mapper.Map<AccountResponse>(account);
        }

        public AccountResponse Update(int Id, UpdateRequest request)
        {
            var account = GetAccountId(Id);

            _mapper.Map(request, account);

            account.LastUpdatedDate = DateTime.UtcNow;

            // account.PasswordHash = ...

            _context.Update(account);
            _context.SaveChanges();

            return _mapper.Map<AccountResponse>(account);
        }

        public void Delete(int Id)
        {
            var account = GetAccountId(Id);
            _context.Accounts.Remove(account);
            _context.SaveChanges();
        }

        // private methods
        private RefreshToken rotateRefreshToken(RefreshToken refreshToken, string ipAddress)
        {
            var newRefreshToken = _jwtUtils.generateRefreshToken(ipAddress);

            revokeRefreshToken(refreshToken, ipAddress);
            return newRefreshToken;
        }

        private Account? getByEmail(string email)
        {
            var account = _context.Accounts.SingleOrDefault(x => x.Email == email);
            return account;
        }

        private void revokeRefreshToken(RefreshToken token, string ipAddress, string newToken = null)
        {
            token.RevokedDate = DateTime.UtcNow;
            token.RevokedByIp = ipAddress;
            token.ReplacedByToken = newToken;
        }

        private void revokeDescendantRefreshTokens(RefreshToken refreshToken, Account account, string ipAddress)
        {
            if (!string.IsNullOrEmpty(refreshToken.ReplacedByToken))
            {
                var childToken = account.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken.ReplacedByToken);
                if (childToken != null)
                    revokeRefreshToken(childToken, ipAddress);
            }
        }

        private Account getAccountByRefreshToken(string token)
        {
            var account = _context.Accounts.SingleOrDefault(x => x.RefreshTokens.Any(t => t.Token == token));
            if (account == null) throw new AppException("Invalid token");
            return account;
        }

        private void removeOldRefreshTokens(Account account)
        {
            account.RefreshTokens.RemoveAll(x => x.IsActive == false
                                                 && x.CreatedDate.AddDays(_appSettings.RefreshTokenTTL) <= DateTime.UtcNow);
        }

        private string generateRandomToken()
        {
            var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
            
            var isUniqueToken = !_context.Accounts.Any(x => x.Token == token);
            if (!isUniqueToken)
                return generateRandomToken();

            return token;
        }

        private void sendVerifyEmail(Account account)
        {
            if (account.Email != null && account.VerifyToken != null)
            {
                string body = $"<p>Here is your verification token:</p><code>{account.VerifyToken}</code>";
                // string body = $"<p>Click</p><a href='http://localhost:4000/verify?Token={account.VerifyToken}'>link</a> verify your account";
                _emailService.Send(account.Email, "Verify account", body);
            }
        }

        private void sendForgotPassword(Account account)
        {
            if (account.Email != null && account.ResetToken != null)
            {
                string body = $"<p>Here is your reset token:</p><code>{account.ResetToken}</code>";
                _emailService.Send(account.Email, "Forgot password", body);
            }
        }

        public void ChangeTimeAliveToken(ChangeTimeAliveRequest request)
        {
            _jwtUtils.ChangeTokenAliveTime(request.time);
        }

        private void sendWarningLogin(Account account, string ipAddress)
        {
            if (account.Email != null && account.NewLoginToken != null)
            {
                string body = $"<p>Someone is trying to access to your account: {ipAddress}</p>" +
                $"<p>If you are the one logined, use this token to verify: {account.NewLoginToken}</p>";
                _emailService.Send(account.Email, "Unkown login", body);
            }
        }
    }
}
