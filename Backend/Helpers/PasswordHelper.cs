using Microsoft.AspNetCore.Identity;

namespace Auth.Api.Helpers;

public static class PasswordHelper
{
    private static readonly PasswordHasher<object> Hasher = new();

    public static string HashPassword(string password)
    {
        return Hasher.HashPassword(new object(), password);
    }

    public static bool VerifyPassword(string password, string passwordHash)
    {
        return Hasher.VerifyHashedPassword(new object(), passwordHash, password)
            != PasswordVerificationResult.Failed;
    }
}
