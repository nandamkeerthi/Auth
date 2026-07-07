using Auth.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.Api.Configurations;

public class PasswordResetTokenConfiguration : IEntityTypeConfiguration<PasswordResetToken>
{
    public void Configure(EntityTypeBuilder<PasswordResetToken> builder)
    {
        builder.ToTable("PASSWORD_RESET_TOKENS");

        builder.HasKey(token => token.TokenId);

        builder.Property(token => token.TokenId)
            .HasColumnName("TOKEN_ID")
            .ValueGeneratedOnAdd();

        builder.Property(token => token.UserId)
            .HasColumnName("USER_ID")
            .IsRequired();

        builder.Property(token => token.ResetToken)
            .HasColumnName("RESET_TOKEN")
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(token => token.ExpiryTime)
            .HasColumnName("EXPIRY_TIME")
            .IsRequired();

        builder.Property(token => token.IsUsed)
            .HasColumnName("IS_USED")
            .IsRequired();

        builder.Property(token => token.CreatedAt)
            .HasColumnName("CREATED_AT")
            .IsRequired();

        builder.HasIndex(token => token.ResetToken)
            .IsUnique()
            .HasDatabaseName("IX_PASSWORD_RESET_TOKENS_RESET_TOKEN");

        builder.HasOne(token => token.User)
            .WithMany(user => user.PasswordResetTokens)
            .HasForeignKey(token => token.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
