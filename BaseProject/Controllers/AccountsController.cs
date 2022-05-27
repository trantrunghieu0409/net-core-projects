using BaseProject.Authorization;
using BaseProject.Entities;
using BaseProject.Models;
using BaseProject.Services;
using Microsoft.AspNetCore.Mvc;

namespace BaseProject.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountsController: BaseController
    {
        private readonly IAccountService _accountService;

        public AccountsController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public ActionResult<AuthenticateResponse> Authenticate(AuthenticateRequest request)
        {
            var response = _accountService.Authenticate(request, ipAddress());
            if (response.RefreshToken != null) setTokenCookie(response.RefreshToken);
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public ActionResult<AuthenticateResponse> RefreshToken()
        {
            var token = Request.Cookies["refreshToken"];
            var response = _accountService.RefreshToken(token, ipAddress());
            setTokenCookie(response.RefreshToken);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public ActionResult<AccountResponse> Register(RegisterRequest registerRequest)
        {
            return Ok(_accountService.Register(registerRequest, ipAddress()));
        }

        [AllowAnonymous]
        [HttpPost("verify")]
        public ActionResult Verify(VerifyRequest verifyRequest)
        {
            _accountService.Verify(verifyRequest);
            return Ok(new { messsage = "Verify successfully! Login again to start!" });
        }

        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public ActionResult ForgotPassword(ForgotPasswordRequest forgotPasswordRequest)
        {
            _accountService.ForgotPassword(forgotPasswordRequest);
            return Ok(new { message = "Check your email for reset token" });
        }

        [AllowAnonymous, HttpPost("reset-password")]
        public ActionResult ResetPassword(ResetPasswordRequest resetPasswordRequest)
        {
            _accountService.ResetPassword(resetPasswordRequest);
            return Ok(new { message = "Reset password successfully! Login again with new password" });
        }

        [AllowAnonymous]
        [HttpPost("verify-login")]
        public ActionResult VerifyNewLogin(NewLoginRequest request)
        {
            _accountService.VerifyNewLogin(request);
            return Ok(new { message = "Verify successfully!" });
        }

        [Authorize(Role.Admin)]
        [HttpGet]
        public IEnumerable<AccountResponse> GetAllAccounts()
        {
            return _accountService.GetAllAccounts();
        }

        [Authorize(Role.Admin)]
        [HttpGet("{id:int}")]
        public ActionResult<AccountResponse> GetAccountById(int id)
        {
            return Ok(_accountService.GetAccountById(id));
        }

        [Authorize(Role.Admin)]
        [HttpPost]
        public ActionResult<AccountResponse> CreateAccount(CreateRequest createRequest)
        {
            return Ok(_accountService.Create(createRequest));
        }

        [HttpPut("{id:int}")]
        public ActionResult<AccountResponse> UpdateAccount(int id, UpdateRequest updateRequest)
        {
            if (Account.Role != Role.Admin || Account.Id != id)
                return Unauthorized(new { message = "Unauthorized" });

            return Ok(_accountService.Update(id, updateRequest));
        }

        [Authorize(Role.Admin)]
        [HttpDelete("{id:int}")]
        public ActionResult DeleteAccount(int id)
        {
            _accountService.Delete(id);
            return Ok(new { message = "Delete account successfully" });
        }

        [Authorize(Role.Admin)]
        [HttpPost("time-alive")]
        public ActionResult ChangeTokenTimeAlive(ChangeTimeAliveRequest changeTimeAliveRequest)
        {
            _accountService.ChangeTimeAliveToken(changeTimeAliveRequest);
            return Ok(new { message = "Change successfully" });
        }

        // helper methods
        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }


        private void setTokenCookie(string refreshToken)
        {
            var cookie = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTimeOffset.UtcNow.AddDays(7),
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookie);
        }
    }
}
