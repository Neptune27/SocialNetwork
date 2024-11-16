using SocialNetwork.Profile.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Profile.Data.DTOs.Friends;

public class FriendDTO
{
    public string Id { get; set; }

    public string UserName { get; set; }

    public string ProfilePicture { get; set; }

    public DateOnly BirthDay { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Background { get; set; }

    public FriendDTO() { }

    public FriendDTO(User user)
    {
        Id = user.Id;
        UserName = user.UserName;
        ProfilePicture = user.ProfilePicture;
        BirthDay = user.BirthDay;
        FirstName = user.FirstName;
        LastName = user.LastName;
        Background = user.Background;
    }
}
