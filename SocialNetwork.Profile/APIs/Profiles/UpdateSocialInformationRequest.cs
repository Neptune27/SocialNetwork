using Mediator;
using SocialNetwork.Profile.Data.DTOs.Profiles;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateSocialInformationRequest : IRequest<bool>
	{
		public string UserId { get; set; }
		public string Location { get; set; }
		public string Instagram { get; set; }
		public string Twitter { get; set; }
		public string GitHub { get; set; }

		public UpdateSocialInformationRequest(string userId, string location, string instagram, string twitter, string gitHub)
		{
			UserId = userId;
			Location = location;
			Instagram = instagram;
			Twitter = twitter;
			GitHub = gitHub;
		}
		public UpdateSocialInformationRequest(string userId, SocialInformationDTO dto)
		{
			UserId = userId;
			Location = dto.location;
			Instagram = dto.instagram;
			Twitter = dto.twitter;
			GitHub = dto.github;
		}
	}
}
