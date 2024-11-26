using Mediator;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.RoomLastSeens;

public class GetListRoomLastSeenRequest(string userId) : IRequest<List<RoomLastSeen>>
{
    public string UserId { get; } = userId;
}