using Mediator;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class PatchImageRoomRequest(string userId, int roomId, string profile) : IRequest<bool>
{
    public string UserId { get; } = userId;
    public int RoomId { get; } = roomId;
    public string Profile { get; } = profile;
}