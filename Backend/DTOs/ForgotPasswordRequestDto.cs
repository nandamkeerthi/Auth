using System.ComponentModel.DataAnnotations;

namespace Auth.Api.DTOs;

public class ForgotPasswordRequestDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}
