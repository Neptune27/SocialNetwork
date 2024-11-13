using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.Models;
using SocialNetwork.Profile.Integrations;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateProfilePictureHandler(AppDBContext dBContext, IMediator mediator) : IRequestHandler<UpdateProfilePictureRequest, bool>
	{
		private readonly AppDBContext dBContext = dBContext;
        private readonly IMediator mediator = mediator;

        public async ValueTask<bool> Handle(UpdateProfilePictureRequest request, CancellationToken cancellationToken)
		{

			var userId = request.UserId;
			var profilePicture = request.ProfilePicture;

			var saveToPath = Path.Combine("Media", userId, profilePicture);
			var wwwrootPath = Path.Combine("./wwwroot", saveToPath);
			var staticPath = Path.Combine("./StaticFiles/Media", userId, profilePicture);
			var dir = Path.GetDirectoryName(wwwrootPath);
			Directory.CreateDirectory(dir);

			File.Copy(staticPath, wwwrootPath, true );

			var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
			if(user == null)
			{
				return false;
			}
			user.ProfilePicture = saveToPath;
			await dBContext.SaveChangesAsync(cancellationToken);
			await mediator.Send(new PublishAvatarChangeRequest(request.UserId, request.ProfilePicture), cancellationToken);

			return true;
		}
	}
}
