using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Models;
using SocialNetwork.Messaging.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Messaging.Data;

public class AppDBContext : DbContext
{
    public AppDBContext(DbContextOptions options) : base(options)
    {
    }

    protected AppDBContext()
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Message>()
            .HasOne(c => c.ReplyTo)
            .WithOne()
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<RoomLastSeen>()
            .HasKey(c => new
            {
                c.UserId,
                c.RoomId
            });

        modelBuilder.Entity<BasicUser>()
            .HasMany(m => m.Friends)
            .WithMany(m => m.FriendOf)
            .UsingEntity<BasicFriend>(
                e => e.HasOne<BasicUser>().WithMany().HasForeignKey(e => e.UserTosId),
                e => e.HasOne<BasicUser>().WithMany().HasForeignKey(e => e.UserFromsId)
            );

    }

    public DbSet<MessageUser> Users { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<RoomLastSeen> RoomsLastSeen { get; set; }
    public DbSet<BasicFriend> Friends { get; set; }

}
