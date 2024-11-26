using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.DTOs.Friends;

namespace SocialNetwork.Profile.APIs.Friends
{
	public class DeleteFriendHandler(AppDBContext dBContext) : IRequestHandler<DeleteFriendRequest, bool>
	{
		private readonly AppDBContext dBContext = dBContext;




		public async ValueTask<bool> Handle(DeleteFriendRequest request, CancellationToken cancellationToken)
		{
			var result = await dBContext.Friends
			.Include(f => f.UserFrom)
			.Include(f => f.UserTo)
			.FirstOrDefaultAsync(f => (f.UserFromId == request.UserId && f.UserToId == request.Id) || (f.UserFromId == request.Id && f.UserToId == request.UserId));

			if (result is null)
			{
				return false;
			}
			dBContext.Friends.Remove(result);
			await dBContext.SaveChangesAsync(cancellationToken);
			return true;

		}
	}
}
