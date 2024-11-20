using Mediator;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateLocationRequest(string userId, string location) : IRequest<bool>
	{
		public string UserId { get; set; } = userId;
		public string Location { get; set; } = location;


	}
}
