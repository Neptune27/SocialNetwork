using Mediator;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateLastNameRequest(string userId, string lastName) : IRequest<bool>
	{
		public string UserId { get; set; } = userId;
		public string LastName { get; set; } = lastName;

	}
}
