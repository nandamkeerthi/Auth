namespace Auth.Api.Models;

public class PasswordResetToken
{
    public int TokenId { get; set; }

    public int UserId { get; set; }

    public string ResetToken { get; set; } = string.Empty;

    public DateTime ExpiryTime { get; set; }

    public bool IsUsed { get; set; }

    public DateTime CreatedAt { get; set; }

    public User User { get; set; } = null!;
}
