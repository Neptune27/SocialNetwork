using Mediator;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class GetRoomsRequest(
    string userId,
    (int From, int To) pagination
    ) : IRequest<List<Room>>
{
    public string UserId { get; } = userId;
    public (int From, int To) Pagination { get; } = pagination;
}