using Auth.Api.DTOs;

namespace Auth.Api.Interfaces;

public interface IAuthService
{
    Task<AuthMessageResponseDto> ForgotPasswordAsync(ForgotPasswordRequestDto request);

    Task<AuthMessageResponseDto> ResetPasswordAsync(ResetPasswordRequestDto request);
}
