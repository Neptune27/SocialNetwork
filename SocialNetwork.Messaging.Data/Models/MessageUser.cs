using SocialNetwork.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Messaging.Data.Models;

public class MessageUser : BasicUser
{
    public MessageUser() { }

    public MessageUser(BasicUser user)
    {
        Id = user.Id;
        Name = user.Name;
        Picture = user.Picture;
        Friends = user.Friends;
    }

    public List<Room> Rooms { get; set; } = [];  

}
