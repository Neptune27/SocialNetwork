using SocialNetwork.Core.Models;
using SocialNetwork.Messaging.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Messaging.Data.Models;

public class Room
{

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public List<BasicUser> Users { get; set; }

    public List<Message> Messages { get; set; }

    public string Name { get; set; }

    public BasicUser CreatedBy { get; set; }

    public string Profile { get; set; }

    public int Total => Users.Count;

    public DateTime LastUpdated { get; set; }

    public RoomType RoomType { get; set; }
}
