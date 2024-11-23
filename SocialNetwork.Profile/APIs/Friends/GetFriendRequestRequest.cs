using Mediator;
using SocialNetwork.Profile.Data.DTOs.Friends;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Friends
{
	public class GetFriendRequestRequest(string userId, string id) : IRequest<FriendRequest>
	{
		public string UserId { get; } = userId;
		public string Id { get; } = id;
	}
}

