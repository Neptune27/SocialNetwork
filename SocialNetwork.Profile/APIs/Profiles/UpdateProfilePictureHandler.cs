﻿using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.Models;

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
			return true;
		}
	}
}
