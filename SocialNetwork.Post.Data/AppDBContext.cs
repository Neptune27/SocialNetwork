using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Models;
using SocialNetwork.Post.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Post.Data;

public class AppDBContext : DbContext
{
    public AppDBContext() { }

    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.ReplyTo)
            .WithOne()
            .OnDelete(DeleteBehavior.NoAction);

        //modelBuilder.Entity<CommentReaction>()
        //    .HasKey(t => new
        //    {
        //        t.UserId, t.CommentId
        //    });

        //modelBuilder.Entity<Reaction>()
        //    .HasOne(r => r.Post).WithOne().HasForeignKey<Models.Post>(p => p.Id);

        //modelBuilder.Entity<Reaction>()
        //.HasKey(t => new
        //{
        //    t.UserId,
        //    t.PostId,
        //})
        //;
        //modelBuilder.Entity<Comment>()
        //    .HasMany(e => e.Reactions)
        //    .WithOne(e => e.Comment)
        //    .HasForeignKey(e => new { e.CommentId, e.UserId });
    }

    public DbSet<Comment> Comments { get; set; }
    public DbSet<CommentReaction> CommentReactions { get; set; }
    public DbSet<Models.Post> Posts { get; set; }
    public DbSet<Reaction> Reactions { get; set; }
    public DbSet<BasicUser> Users { get; set; }

}
