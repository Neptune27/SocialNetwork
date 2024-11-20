using Mediator;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateGithubRequest(string userId, string github):IRequest<bool>
	{
		public string UserId { get; set; } = userId;
		public string Github { get; set; } = github;
	}
}
