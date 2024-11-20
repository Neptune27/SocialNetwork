using Mediator;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateTwitterRequest(string userId, string twitter):IRequest<bool>
	{
		public string UserId { get; set; } = userId;
		public string Twitter { get; set; } = twitter;
	}
}
