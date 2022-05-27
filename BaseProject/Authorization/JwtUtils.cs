using BaseProject.Entities;
using BaseProject.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BaseProject.Authorization
{
    public class JwtUtils
    {
        private DataContext _dataContext;
        private readonly AppSettings _appSettings;

        public JwtUtils(DataContext dataContext, IOptions<AppSettings> appSettings)
        {
            _dataContext = dataContext;
            _appSettings = appSettings.Value;
        }

        public string GenerateToken(Account account)
        {
            var tokenHandelr = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", account.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddMinutes(_appSettings.MinutesTokenAlive ?? 15), // default is 15 minutes
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandelr.CreateToken(tokenDescriptor);

            return tokenHandelr.WriteToken(token);
        }

        public int? ValidateToken(string? token)
        {
            if (token == null)
                return null;

            var tokenHandelr = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            tokenHandelr.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var accountId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

            return accountId;
        }

        bool isUniqueToken(RefreshToken refreshToken)
        {
            return !_dataContext.Accounts.Any(x => x.RefreshTokens.Any(t => t.Token == refreshToken.Token));
        }

        public RefreshToken generateRefreshToken(string ipAddess)
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToHexString(RandomNumberGenerator.GetBytes(64)),
                ExpiredDate = DateTime.UtcNow.AddDays(7),
                CreatedByIpAddress = ipAddess,
            };
            if (!isUniqueToken(refreshToken)) return generateRefreshToken(ipAddess);
            return refreshToken;
        }

        public void ChangeTokenAliveTime(int time)
        {
            if (time >= 1 && time <= 60)
            {
                _appSettings.MinutesTokenAlive = time;
            }
            else
            {
                throw new AppException("Invalid time-alive for token");
            }
        }
    }
}
