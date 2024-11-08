using SocialNetwork.Core.Models;
using SocialNetwork.Messaging.Data.Enums;
using SocialNetwork.Messaging.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Messaging.Data.DTOs;

public class SignalRoomResponseDTO
{

    public SignalRoomResponseDTO(Room room)
    {
        Id = room.Id;
        Name = room.Name;
        CreatedBy = null;
        Profile = room.Profile;
        RoomType = room.RoomType;
    }

    public SignalRoomResponseDTO() { }

    public int Id { get; set; }

    public List<UserResponseDTO> Users { get; set; } = [];

    public List<MessageResponseDTO> Messages { get; set; } = [];

    public string Name { get; set; }

    public UserResponseDTO CreatedBy { get; set; }

    public string Profile { get; set; }

    public RoomType RoomType { get; set; }
}
