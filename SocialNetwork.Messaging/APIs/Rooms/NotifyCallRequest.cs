using Mediator;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class NotifyCallRequest(string userId, int roomId) : IRequest<bool>
{
    public string UserId { get; } = userId;
    public int RoomId { get; } = roomId;
}