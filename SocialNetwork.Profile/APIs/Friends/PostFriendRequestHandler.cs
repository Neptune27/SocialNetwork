using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Models;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.Models;
using SocialNetwork.Profile.Integrations;

namespace SocialNetwork.Profile.APIs.Friends;

public class PostFriendRequestHandler(AppDBContext dBContext, IMediator mediator) : IRequestHandler<PostFriendRequestRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;
    private readonly IMediator mediator = mediator;

    public async ValueTask<bool> Handle(PostFriendRequestRequest request, CancellationToken cancellationToken)
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

        if (fromRequest is null && toRequest is null)
        {
            FriendRequest friendRequest = new()
            {
                Sender = user,
                Reciever = otherUser,
            };
            dBContext.FriendRequests.Add(friendRequest);
            await dBContext.SaveChangesAsync(cancellationToken);
            return true;
        }

        if (toRequest is not null)
        {

            //user.Friends.Add(otherUser);
            //otherUser.Friends.Add(user);

            Friend friend = new()
            {
                CreatedAt = DateTime.UtcNow,
                LastUpdated = DateTime.UtcNow,
                UserFrom = user,
                UserTo = otherUser,
                Visibility = Core.Enums.EVisibility.PUBLIC
            };

            dBContext.FriendRequests.Remove(toRequest);

            if (fromRequest is not null) 
                dBContext.FriendRequests.Remove(fromRequest);

            dBContext.Friends.Add(friend);

            await dBContext.SaveChangesAsync(cancellationToken);

            await mediator.Send(new PublishFriendAddRequest(user.Id, otherUser.Id));

            return true;
        }
        return true;
    }
}