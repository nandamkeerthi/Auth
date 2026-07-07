using Auth.Api.Data;
using Auth.Api.DTOs;
using Auth.Api.Helpers;
using Auth.Api.Interfaces;
using Auth.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Auth.Api.Services;

public class AuthService : IAuthService
{
    private const string GenericForgotPasswordMessage =
        "If an account exists with this email address, a password reset link will be sent.";

    private readonly ApplicationDbContext _dbContext;
    private readonly IEmailService _emailService;
    private readonly PasswordResetSettings _passwordResetSettings;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        ApplicationDbContext dbContext,
        IEmailService emailService,
        IOptions<PasswordResetSettings> passwordResetSettings,
        ILogger<AuthService> logger)
    {
        _dbContext = dbContext;
        _emailService = emailService;
        _passwordResetSettings = passwordResetSettings.Value;
        _logger = logger;
    }

    public async Task<AuthMessageResponseDto> ForgotPasswordAsync(ForgotPasswordRequestDto request)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email.ToLower() == normalizedEmail);

        if (user is not null)
        {
            var resetToken = TokenHelper.GenerateSecureToken();
            var now = DateTime.UtcNow;

            var passwordResetToken = new PasswordResetToken
            {
                UserId = user.UserId,
                ResetToken = resetToken,
                ExpiryTime = now.AddMinutes(_passwordResetSettings.TokenExpiryMinutes),
                IsUsed = false,
                CreatedAt = now,
            };

            _dbContext.PasswordResetTokens.Add(passwordResetToken);
            await _dbContext.SaveChangesAsync();

            var resetUrl = $"{_passwordResetSettings.FrontendBaseUrl.TrimEnd('/')}/reset-password?token={resetToken}";

            try
            {
                await _emailService.SendPasswordResetEmailAsync(user.Email, resetUrl);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Password reset email could not be sent for user {UserId}", user.UserId);
            }
        }

        return new AuthMessageResponseDto
        {
            Message = GenericForgotPasswordMessage,
        };
    }

    public async Task<AuthMessageResponseDto> ResetPasswordAsync(ResetPasswordRequestDto request)
    {
        var tokenEntity = await _dbContext.PasswordResetTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.ResetToken == request.Token);

        if (tokenEntity is null)
        {
            throw new InvalidOperationException("Invalid or expired password reset token.");
        }

        if (tokenEntity.IsUsed)
        {
            throw new InvalidOperationException("This password reset link has already been used.");
        }

        if (tokenEntity.ExpiryTime <= DateTime.UtcNow)
        {
            throw new InvalidOperationException("This password reset link has expired.");
        }

        var user = tokenEntity.User;
        user.PasswordHash = PasswordHelper.HashPassword(request.NewPassword);
        user.UpdatedAt = DateTime.UtcNow;

        tokenEntity.IsUsed = true;

        await _dbContext.SaveChangesAsync();

        return new AuthMessageResponseDto
        {
            Message = "Password has been reset successfully.",
        };
    }
}
