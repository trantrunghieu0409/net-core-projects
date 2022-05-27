using BaseProject.Helpers;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace BaseProject.Services
{
    public interface IEmailService
    {
        void Send(string dest, string subject, string body, string src = null);
    }

    public class EmailService : IEmailService
    {
        private readonly AppSettings _appSettings;

        public EmailService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public void Send(string dest, string subject, string body, string src = null)
        {
            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse(src ?? _appSettings.EmailFrom));
            email.To.Add(MailboxAddress.Parse(dest));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = body };

            using var smtp = new SmtpClient();
            smtp.Connect(_appSettings.SmtpHost, _appSettings.SmtpPort, SecureSocketOptions.StartTls);
            smtp.Authenticate(_appSettings.SmtpUser, _appSettings.SmtpPass);
            smtp.Send(email);
            smtp.Dispose();
        }
    }
}
