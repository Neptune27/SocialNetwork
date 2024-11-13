using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateBackgroundHandler : IRequestHandler<UpdateBackgroundRequest, bool>
	{

		private readonly AppDBContext dBContext;

		public UpdateBackgroundHandler(AppDBContext dBContext)
		{
			this.dBContext = dBContext;
		}

		public async ValueTask<bool> Handle(UpdateBackgroundRequest request, CancellationToken cancellationToken)
		{
			var userId = request.UserId;
			var profilePicture = request.Background;

			var saveToPath = Path.Combine("Media", userId, profilePicture);
			var wwwrootPath = Path.Combine("./wwwroot", saveToPath);
			var staticPath = Path.Combine("./StaticFiles/Media", userId, profilePicture);
			var dir = Path.GetDirectoryName(wwwrootPath);
			Directory.CreateDirectory(dir);

			File.Copy(staticPath, wwwrootPath, true);

			var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
			if (user == null)
			{
				return false;
			}
			user.Background = saveToPath;
			await dBContext.SaveChangesAsync(cancellationToken);
			return true;

		}
	}
}
