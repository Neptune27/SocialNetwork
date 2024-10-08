using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Identity.Data.Models;

namespace SocialNetwork.Identity.Data.Context;

public class AppDBContext : IdentityDbContext<AppUser>
{
    public AppDBContext(DbContextOptions options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        List<IdentityRole> identityRoles = [
            new IdentityRole
            {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Name = "User",
                NormalizedName = "USER"
            }
            ];

        builder.Entity<IdentityRole>().HasData(identityRoles);

    }
}
