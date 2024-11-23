using Mediator;
using SocialNetwork.Profile.Data.DTOs.Friends;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Friends;

public class GetFriendsRequestRequest(string userId) : IRequest<List<FriendRequest>>
{
    public string UserId { get; } = userId;
}