using Mediator;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateProfilePictureRequest : IRequest<bool>
	{
		public string UserId;
		public string ProfilePicture;

		public UpdateProfilePictureRequest(string userId, string profilePicture)
		{
			UserId = userId;
			ProfilePicture = profilePicture;
		}
	}
}
