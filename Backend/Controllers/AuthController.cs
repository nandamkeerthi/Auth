using Auth.Api.DTOs;
using Auth.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Auth.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("forgot-password")]
    public async Task<ActionResult<AuthMessageResponseDto>> ForgotPassword(
        [FromBody] ForgotPasswordRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var response = await _authService.ForgotPasswordAsync(request);
        return Ok(response);
    }

    [HttpPost("reset-password")]
    public async Task<ActionResult<AuthMessageResponseDto>> ResetPassword(
        [FromBody] ResetPasswordRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var response = await _authService.ResetPasswordAsync(request);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Password reset failed for provided token.");
            return BadRequest(new AuthMessageResponseDto { Message = ex.Message });
        }
    }
}
