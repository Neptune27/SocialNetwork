using Mediator;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Friends;

public class GetFriendsRequest(string userId) : IRequest<List<MessageUser>>
{
    public string UserId { get; } = userId;
}