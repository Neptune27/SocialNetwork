using Mediator;
using SocialNetwork.Profile.Data.DTOs.Friends;

namespace SocialNetwork.Profile.APIs.Friends
{
	public class DeleteFriendRequest(string userId, string id) : IRequest<bool>
	{
		public string UserId { get; } = userId;
		public string Id { get; } = id;
	}
}
