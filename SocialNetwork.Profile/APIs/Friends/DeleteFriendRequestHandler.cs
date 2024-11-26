using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.Models;
using SocialNetwork.Profile.Integrations;

namespace SocialNetwork.Profile.APIs.Friends;

public class DeleteFriendRequestHandler(AppDBContext dBContext, IMediator mediator) : IRequestHandler<DeleteFriendRequestRequest, bool>
{
	private readonly AppDBContext dBContext = dBContext;
	private readonly IMediator mediator = mediator;

	public async ValueTask<bool> Handle(DeleteFriendRequestRequest request, CancellationToken cancellationToken)
	{
		var otherUser = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken: cancellationToken);
		var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken: cancellationToken);

		if (otherUser == null) { return false; }

		if (otherUser.Id == request.UserId) { return false; }

		if (user == null) { return false; }

		var fromRequest = await dBContext.FriendRequests
			.FirstOrDefaultAsync(f => f.Sender.Id == user.Id && f.Reciever.Id == otherUser.Id, cancellationToken: cancellationToken);

		var toRequest = await dBContext.FriendRequests
	.FirstOrDefaultAsync(f => f.Sender.Id == otherUser.Id && f.Reciever.Id == user.Id, cancellationToken: cancellationToken);


		if (toRequest is not null)
		{
			dBContext.FriendRequests.Remove(toRequest);
		}
		if (fromRequest is not null)
		{
			dBContext.FriendRequests.Remove(fromRequest);
		}

        await dBContext.SaveChangesAsync(cancellationToken);
		return true;
	}
}