using Mediator;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class GetRoomsRequest(
    string userId
    ) : IRequest<List<Room>>
{
    public string UserId { get; } = userId;
}