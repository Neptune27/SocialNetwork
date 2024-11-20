using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateLocationHandler : IRequestHandler<UpdateLocationRequest, bool>
	{
		private readonly AppDBContext dBContext;

		public UpdateLocationHandler(AppDBContext dBContext)
		{
			this.dBContext = dBContext;
		}

		public async ValueTask<bool> Handle(UpdateLocationRequest request, CancellationToken cancellationToken)
		{
			var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
			if (user == null)
			{
				return false;
			}
			user.Location = request.Location;
			user.LastUpdated = DateTime.Now;
			await dBContext.SaveChangesAsync();
			return true;
		}
	}
}
