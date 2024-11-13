using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Friends;

public class PostFriendRequestHandler(AppDBContext dBContext) : IRequestHandler<PostFriendRequestRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<bool> Handle(PostFriendRequestRequest request, CancellationToken cancellationToken)
    {
        var otherUser = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken: cancellationToken);
        var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken: cancellationToken);

        if (otherUser == null) { return false; }

        if (otherUser.Id == request.Id) { return false; }

        if (user == null) { return false; }

        var fromRequest = await dBContext.FriendRequests
            .FirstOrDefaultAsync(f => f.Sender.Id == user.Id, cancellationToken: cancellationToken);

        if (fromRequest == null)
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

        var toRequest = await dBContext.FriendRequests
    .FirstOrDefaultAsync(f => f.Sender.Id == otherUser.Id, cancellationToken: cancellationToken);

        if (toRequest is not null)
        {

            user.Friends.Add(otherUser);
            otherUser.Friends.Add(user);
            dBContext.FriendRequests.Remove(toRequest);
            await dBContext.SaveChangesAsync(cancellationToken);
            return true;
        }

        return true;
    }
}