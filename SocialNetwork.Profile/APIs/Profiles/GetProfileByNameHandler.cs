using Mediator;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Profiles;

public class GetProfileByNameHandler(AppDBContext dBContext) : IRequestHandler<GetProfileByNameRequest, List<User>>
{
	private readonly AppDBContext dBContext = dBContext;

        public async ValueTask<List<User>> Handle(GetProfileByNameRequest request, CancellationToken cancellationToken)
	{
		var user = await dBContext
			.Users
			.Where(u => u.UserName.ToLower().Contains(request.Name.ToLower())).ToListAsync();
		return user;


	}
}
