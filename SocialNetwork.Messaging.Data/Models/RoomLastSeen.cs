using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Messaging.Data.Models;

public class RoomLastSeen
{
    public string UserId { get; set; }

    public int RoomId { get; set; }

    public MessageUser User { get; set; }

    public DateTime LastSeen { get; set; }

    public Room Room { get; set; }
}
