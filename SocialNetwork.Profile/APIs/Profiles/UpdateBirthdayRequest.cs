using Mediator;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateBirthdayRequest : IRequest<bool>
	{
		public DateOnly Birthday;
		public string UserId;

		public UpdateBirthdayRequest(DateOnly birthday, string userId)
		{
			Birthday = birthday;
			UserId = userId;
		}
	}
}
