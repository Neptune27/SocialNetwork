using Mediator;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class GetProfileRequest : IRequest<User>
	{
		public string ProfileId { get; set; }
		public string UserId { get; set; }

		public GetProfileRequest(string profileId, string userId)
		{
			ProfileId = profileId;
			UserId = userId;
		}
	}
}
