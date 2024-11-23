using Mediator;

namespace SocialNetwork.Profile.APIs.Friends;

public class DeleteFriendRequestRequest(string userId, string id) : IRequest<bool>
{
	public string UserId { get; } = userId;
	public string Id { get; } = id;
}
