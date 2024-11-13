using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Profile.Data.Models;

//public enum EFriendStatus
//{
//    Pending = 0,
//    Failed = 1,
//    Success = 2,
//}

public class FriendRequest 
{
    public string SenderId { get; set; }

    public string RecieverId { get; set; }

    public User Sender { get; set; }

    public User Reciever { get; set; }

}
