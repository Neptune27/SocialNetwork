using Mediator;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateFirstNameRequest(
	string userId,
	string firstName
	) : IRequest<bool>
	{
		public string UserId { get; set; } = userId;
		public string FirstName { get; set; } = firstName;
	}
}
