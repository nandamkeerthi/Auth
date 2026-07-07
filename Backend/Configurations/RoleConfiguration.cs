using Auth.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.Api.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.ToTable("ROLES");

        builder.HasKey(role => role.RoleId);

        builder.Property(role => role.RoleId)
            .HasColumnName("ROLE_ID")
            .ValueGeneratedOnAdd();

        builder.Property(role => role.RoleName)
            .HasColumnName("ROLE_NAME")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(role => role.Description)
            .HasColumnName("DESCRIPTION")
            .HasMaxLength(500);

        builder.Property(role => role.CreatedAt)
            .HasColumnName("CREATED_AT")
            .IsRequired();

        builder.Property(role => role.UpdatedAt)
            .HasColumnName("UPDATED_AT")
            .IsRequired();

        builder.HasIndex(role => role.RoleName)
            .IsUnique()
            .HasDatabaseName("IX_ROLES_ROLE_NAME");

        builder.HasMany(role => role.Users)
            .WithOne(user => user.Role)
            .HasForeignKey(user => user.RoleId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
