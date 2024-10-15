using Mediator;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class GetRoomRequest(
    int roomId
    ) : IRequest<Room?>
{
    public int RoomId { get; } = roomId;
}
