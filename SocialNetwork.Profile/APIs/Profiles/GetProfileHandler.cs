using Mediator;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Profiles
{
	public class GetProfileHandler : IRequestHandler<GetProfileRequest, User>
	{
		private readonly AppDBContext dBContext;

		public GetProfileHandler(AppDBContext dBContext)
		{
			this.dBContext = dBContext;
		}

		public async ValueTask<User> Handle(GetProfileRequest request, CancellationToken cancellationToken)
		{
			var user = await dBContext
				.Users
				.FirstOrDefaultAsync(u => u.Id == request.ProfileId);
			if (user == null) {
				return null;
			}
			return user;


		}
	}
}
