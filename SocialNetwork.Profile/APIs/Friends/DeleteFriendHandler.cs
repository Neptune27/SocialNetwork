using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.DTOs.Friends;
using SocialNetwork.Profile.Data.Models;
using SocialNetwork.Profile.Integrations;

namespace SocialNetwork.Profile.APIs.Friends
{
	public class DeleteFriendHandler(AppDBContext dBContext, IMediator mediator) : IRequestHandler<DeleteFriendRequest, bool>
	{
		private readonly AppDBContext dBContext = dBContext;
        private readonly IMediator mediator = mediator;

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
            await mediator.Send(new PublishFriendRemoveRequest(result.UserFromId, result.UserToId), cancellationToken);

            return true;


		}
	}
}
