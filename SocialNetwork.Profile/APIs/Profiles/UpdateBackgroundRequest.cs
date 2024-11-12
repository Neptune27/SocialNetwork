using Mediator;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateBackgroundRequest:IRequest<bool>
	{
		public string UserId { get; set; }
		public string Background {  get; set; }

		public UpdateBackgroundRequest(string userId, string background)
		{
			UserId = userId;
			Background = background;
		}
	}
}
