using Auth.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.Api.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("USERS");

        builder.HasKey(user => user.UserId);

        builder.Property(user => user.UserId)
            .HasColumnName("USER_ID")
            .ValueGeneratedOnAdd();

        builder.Property(user => user.FullName)
            .HasColumnName("FULL_NAME")
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(user => user.Email)
            .HasColumnName("EMAIL")
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(user => user.PasswordHash)
            .HasColumnName("PASSWORD_HASH")
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(user => user.RoleId)
            .HasColumnName("ROLE_ID")
            .IsRequired();

        builder.Property(user => user.Department)
            .HasColumnName("DEPARTMENT")
            .HasMaxLength(150);

        builder.Property(user => user.Status)
            .HasColumnName("STATUS")
            .HasMaxLength(50);

        builder.Property(user => user.LastLogin)
            .HasColumnName("LAST_LOGIN");

        builder.Property(user => user.CreatedAt)
            .HasColumnName("CREATED_AT")
            .IsRequired();

        builder.Property(user => user.UpdatedAt)
            .HasColumnName("UPDATED_AT")
            .IsRequired();

        builder.HasIndex(user => user.Email)
            .IsUnique()
            .HasDatabaseName("IX_USERS_EMAIL");

        builder.HasOne(user => user.Role)
            .WithMany(role => role.Users)
            .HasForeignKey(user => user.RoleId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(user => user.PasswordResetTokens)
            .WithOne(token => token.User)
            .HasForeignKey(token => token.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
