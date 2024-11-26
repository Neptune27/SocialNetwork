using Mediator;

namespace SocialNetwork.Messaging.APIs.RoomLastSeens;

public class UpdateRoomLastSeenRequest(string userId, int roomId) : IRequest<bool>
{
    public string UserId { get; } = userId;
    public int RoomId { get; } = roomId;
}