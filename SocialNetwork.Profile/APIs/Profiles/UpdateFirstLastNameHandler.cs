using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateFirstLastNameHandler : IRequestHandler<UpdateFirstLastNameRequest, bool>
	{
		private readonly AppDBContext dBContext;

		public UpdateFirstLastNameHandler(AppDBContext dBContext)
		{
			this.dBContext = dBContext;
		}

		public async ValueTask<bool> Handle(UpdateFirstLastNameRequest request, CancellationToken cancellationToken)
		{
			var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
			if (user == null)
			{
				return false;
			}
			user.FirstName = request.FirstName;
			user.LastName = request.LastName;
			user.LastUpdated = DateTime.Now;
			await dBContext.SaveChangesAsync();
			return true;
		}
	}
}
