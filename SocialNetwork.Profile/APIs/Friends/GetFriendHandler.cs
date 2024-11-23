using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.DTOs.Friends;

namespace SocialNetwork.Profile.APIs.Friends;

public class GetFriendHandler(AppDBContext dBContext) : IRequestHandler<GetFriendRequest, FriendDTO>
{
	private readonly AppDBContext dBContext = dBContext;




	public async ValueTask<FriendDTO> Handle(GetFriendRequest request, CancellationToken cancellationToken)
	{

		var result = await dBContext.Friends
			.Include(f => f.UserFrom)
			.Include(f => f.UserTo)
			.FirstOrDefaultAsync(f => (f.UserFromId == request.UserId && f.UserToId == request.Id) || (f.UserFromId == request.Id && f.UserToId == request.UserId));

		if (result is null)
		{
			return null;
		}

		var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);

		return new FriendDTO(result.UserFromId == user.Id ? result.UserTo : result.UserFrom);
	}
}
