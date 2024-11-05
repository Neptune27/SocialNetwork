using Mediator;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class GetProfileRequest : IRequest<User>
	{
		public string ProfileId { get; set; }
		public string UserId { get; set; }
		public int TotalFriends { get; }

		public GetProfileRequest(string profileId, string userId, int totalFriends = 9)
		{
			ProfileId = profileId;
			UserId = userId;
			TotalFriends = totalFriends;
		}
	}
}
