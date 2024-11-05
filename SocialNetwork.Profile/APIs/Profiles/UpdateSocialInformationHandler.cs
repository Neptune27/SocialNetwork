using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateSocialInformationHandler : IRequestHandler<UpdateSocialInformationRequest, bool>
	{
		private readonly AppDBContext dBContext;

		public UpdateSocialInformationHandler(AppDBContext dBContext)
		{
			this.dBContext = dBContext;
		}

		public async ValueTask<bool> Handle(UpdateSocialInformationRequest request, CancellationToken cancellationToken)
		{
			var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
			if (user == null)
			{
				return false;
			}
			user.Location = request.Location;
			user.Instagram = request.Instagram;
			user.Twitter = request.Twitter;
			user.Github = request.GitHub;
			await dBContext.SaveChangesAsync(cancellationToken);

			return true;
		}
	}
}
