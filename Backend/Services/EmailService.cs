using System.Net;
using System.Net.Mail;
using Auth.Api.Helpers;
using Auth.Api.Interfaces;
using Microsoft.Extensions.Options;

namespace Auth.Api.Services;

public class EmailService : IEmailService
{
    private readonly SmtpSettings _smtpSettings;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<SmtpSettings> smtpSettings, ILogger<EmailService> logger)
    {
        _smtpSettings = smtpSettings.Value;
        _logger = logger;
    }

    public async Task SendPasswordResetEmailAsync(string recipientEmail, string resetUrl)
    {
        var subject = "Password Reset Request";
        var htmlBody = $@"
<!DOCTYPE html>
<html>
<head>
  <meta charset=""utf-8"" />
</head>
<body style=""font-family: Arial, sans-serif; color: #333333; line-height: 1.6;"">
  <p>Hi,</p>
  <p>We received a request to reset your password for the AI Based Application Maintenance and Support Workbench.</p>
  <p>Click the button below to reset your password.</p>
  <p style=""margin: 24px 0;"">
    <a href=""{resetUrl}"" style=""display: inline-block; padding: 12px 24px; background-color: #1a56db; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;"">Reset Password</a>
  </p>
  <p>If you did not request this password reset, you may safely ignore this email.</p>
</body>
</html>";

        var plainTextBody = $"""
Hi,

We received a request to reset your password for the AI Based Application Maintenance and Support Workbench.

Click the link below to reset your password.

{resetUrl}

If you did not request this password reset, you may safely ignore this email.
""";

        using var message = new MailMessage
        {
            From = new MailAddress(_smtpSettings.SenderEmail, _smtpSettings.SenderName),
            Subject = subject,
            Body = htmlBody,
            IsBodyHtml = true,
        };

        message.To.Add(recipientEmail);
        message.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(
            plainTextBody,
            null,
            "text/plain"));

        using var client = new SmtpClient(_smtpSettings.Host, _smtpSettings.Port)
        {
            EnableSsl = _smtpSettings.EnableSsl,
            Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password),
        };

        try
        {
            await client.SendMailAsync(message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send password reset email to {RecipientEmail}", recipientEmail);
            throw;
        }
    }
}
