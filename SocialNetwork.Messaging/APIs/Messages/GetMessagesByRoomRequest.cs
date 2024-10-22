using Mediator;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Messages;

public class GetMessagesByRoomRequest(
    int roomId,
    int total,
    DateTime fromTime
    ) : IRequest<List<Message>>
{
    public int RoomId { get; } = roomId;
    public int Total { get; } = total;
    public DateTime FromTime { get; } = fromTime;
}
