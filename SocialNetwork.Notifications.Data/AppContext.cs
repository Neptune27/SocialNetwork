using Microsoft.EntityFrameworkCore;
using SocialNetwork.Notifications.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Notifications.Data;

public class AppDBContext : DbContext
{

    public AppDBContext() { }

    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

    public DbSet<Notification> Notifications { get; set; }

}
