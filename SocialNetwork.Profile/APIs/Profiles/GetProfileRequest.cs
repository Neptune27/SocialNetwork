using Mediator;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class GetProfileRequest(string profileId, string userId, int totalFriends = 9) : IRequest<User>
	{
        public string ProfileId { get; set; } = profileId;
        public string UserId { get; set; } = userId;
        public int TotalFriends { get; } = totalFriends;
    }
}
