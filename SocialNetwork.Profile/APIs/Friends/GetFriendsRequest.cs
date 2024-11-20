using Mediator;
using SocialNetwork.Profile.Data.DTOs.Friends;

namespace SocialNetwork.Profile.APIs.Friends;

public class GetFriendsRequest(string userId) : IRequest<List<FriendDTO>>
{
    public string UserId { get; } = userId;
}