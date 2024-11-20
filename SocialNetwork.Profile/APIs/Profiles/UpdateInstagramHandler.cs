using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using System;
using System.Text.RegularExpressions;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateInstagramHandler : IRequestHandler<UpdateInstagramRequest, bool>
	{
		private readonly AppDBContext dBContext;

		public UpdateInstagramHandler(AppDBContext dBContext)
		{
			this.dBContext = dBContext;
		}

		public async ValueTask<bool> Handle(UpdateInstagramRequest request, CancellationToken cancellationToken)
		{
			var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
			if (user == null)
			{
				return false;
			}
			
			user.Instagram = request.Instagram;
			user.LastUpdated = DateTime.Now;
			await dBContext.SaveChangesAsync();
			return true;
		}
	}
}
