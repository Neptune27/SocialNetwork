using SocialNetwork.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Messaging.Data.DTOs;

public class UserResponseDTO
{
    public UserResponseDTO(BasicUser user)
    {
        Id = user.Id;
        Name = user.Name;
        Picture = user.Picture;
    }

    public string Id { get; }
    public string Name { get; }
    public string Picture { get; }
}
