using Mediator;
using SocialNetwork.Profile.Data.DTOs.Friends;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Friends;

public class GetFriendRequest(string userId, string id) : IRequest<FriendDTO>
{
	public string UserId { get; } = userId;
	public string Id { get; } = id;
}
