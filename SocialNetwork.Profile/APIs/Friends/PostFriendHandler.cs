using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.Models;
using SocialNetwork.Profile.Integrations;

namespace SocialNetwork.Profile.APIs.Friends
{
	public class PostFriendHandler(AppDBContext dBContext, IMediator mediator) : IRequestHandler<PostFriendRequest,bool>
	{
		private readonly AppDBContext dBContext = dBContext;
		private readonly IMediator mediator = mediator;


		public async ValueTask<bool> Handle(PostFriendRequest request, CancellationToken cancellationToken)
		{
			var otherUser = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken: cancellationToken);
			var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken: cancellationToken);

			if (otherUser == null) { return false; }

			if (otherUser.Id == request.UserId) { return false; }

			if (user == null) { 
				return false; 
			}

			Friend friend = new()
			{
				CreatedAt = DateTime.UtcNow,
				LastUpdated = DateTime.UtcNow,
				UserFrom = user,
				UserTo = otherUser,
				Visibility = Core.Enums.EVisibility.PUBLIC
			};
			await dBContext.SaveChangesAsync(cancellationToken);

			await mediator.Send(new PublishFriendAddRequest(user.Id, otherUser.Id), cancellationToken);
			return true;
		}
	}
}
