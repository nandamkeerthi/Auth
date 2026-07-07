namespace Auth.Api.Helpers;

public class PasswordResetSettings
{
    public const string SectionName = "PasswordReset";

    public int TokenExpiryMinutes { get; set; } = 30;

    public string FrontendBaseUrl { get; set; } = "http://localhost:5173";
}
