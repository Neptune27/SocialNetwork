using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class UpdateGithubHandler : IRequestHandler<UpdateGithubRequest, bool>
	{
		private readonly AppDBContext dBContext;
		public UpdateGithubHandler(AppDBContext dBContext)
		{
			this.dBContext = dBContext;
		}

		public async ValueTask<bool> Handle(UpdateGithubRequest request, CancellationToken cancellationToken)
		{
			var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
			if (user == null)
			{
				return false;
			}
			user.Github = request.Github;
			user.LastUpdated = DateTime.Now;
			await dBContext.SaveChangesAsync();
			return true;
		}

	}
}
