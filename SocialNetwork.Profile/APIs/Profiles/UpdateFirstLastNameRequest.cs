using Mediator;
using SocialNetwork.Profile.Data.DTOs.Profiles;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateFirstLastNameRequest: IRequest<bool>
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string UserId { get; set; }

		public UpdateFirstLastNameRequest(string firstName, string lastName, string userId)
		{
			FirstName = firstName;
			LastName = lastName;
			UserId = userId;
		}

		public UpdateFirstLastNameRequest(ProfileNameDTO dto, string userId)
		{
			FirstName = dto.FirstName;
			LastName = dto.LastName;
			UserId = userId;
		}
	}
}
