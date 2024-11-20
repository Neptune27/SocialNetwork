using Mediator;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class LeaveRoomRequest(string userId, string roomId) : IRequest<bool>
{
    public string UserId { get; } = userId;
    public string RoomId { get; } = roomId;
}