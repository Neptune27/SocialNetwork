using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateBirthdayHandler : IRequestHandler<UpdateBirthdayRequest, bool>
	{

		private readonly AppDBContext dBContext;

		public UpdateBirthdayHandler(AppDBContext dBContext)
		{
			this.dBContext = dBContext;
		}

		public async ValueTask<bool> Handle(UpdateBirthdayRequest request, CancellationToken cancellationToken)
		{
			var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
			if(user == null)
			{
				return false;
			}
			user.BirthDay = request.Birthday;
			user.LastUpdated = DateTime.Now;
			await dBContext.SaveChangesAsync(cancellationToken);
			return true;
		}
	}
}
