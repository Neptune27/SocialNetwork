using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Models;
using SocialNetwork.Profile.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Profile.Data;

public class AppDBContext : DbContext
{
    public AppDBContext() { }

    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Friend> Friends { get; set; }
    public DbSet<FriendRequest> FriendRequests { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FriendRequest>()
            .HasKey(l => new { l.RecieverId, l.SenderId });

        modelBuilder.Entity<Friend>()
        .HasKey(f => new { f.UserToId, f.UserFromId });


    }

}
