using Mediator;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class PatchNameRoomRequest(string userId, int roomId, string name) : IRequest<bool>
{
    public string UserId { get; } = userId;
    public int RoomId { get; } = roomId;
    public string Name { get; } = name;
}