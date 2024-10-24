using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateProfilePictureHandler : IRequestHandler<UpdateProfilePictureRequest, bool>
	{
		private readonly AppDBContext dBContext;

		public UpdateProfilePictureHandler(AppDBContext dBContext)
		{
			this.dBContext = dBContext;
		}

		public async ValueTask<bool> Handle(UpdateProfilePictureRequest request, CancellationToken cancellationToken)
		{
			var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
			if(user == null)
			{
				return false;
			}
			user.ProfilePicture = request.ProfilePicture;
			await dBContext.SaveChangesAsync(cancellationToken);
			return true;
		}
	}
}
