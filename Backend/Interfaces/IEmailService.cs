namespace Auth.Api.Interfaces;

public interface IEmailService
{
    Task SendPasswordResetEmailAsync(string recipientEmail, string resetUrl);
}
