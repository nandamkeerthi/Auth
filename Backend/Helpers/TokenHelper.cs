using System.Security.Cryptography;

namespace Auth.Api.Helpers;

public static class TokenHelper
{
    public static string GenerateSecureToken()
    {
        var tokenBytes = RandomNumberGenerator.GetBytes(32);
        return Convert.ToBase64String(tokenBytes)
            .Replace('+', '-')
            .Replace('/', '_')
            .TrimEnd('=');
    }
}
