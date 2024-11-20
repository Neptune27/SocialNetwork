using Mediator;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateInstagramRequest(string userId, string instagram) : IRequest<bool>
	{
		public string UserId { get; set; } = userId;
		public string Instagram { get; set; } = instagram;
	}
}
