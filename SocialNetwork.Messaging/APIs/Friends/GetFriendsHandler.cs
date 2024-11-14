using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.Models;
using System.Linq;

namespace SocialNetwork.Messaging.APIs.Friends;

public class GetFriendsHandler(AppDBContext dBContext) : IRequestHandler<GetFriendsRequest, List<MessageUser>>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<List<MessageUser>> Handle(GetFriendsRequest request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;

        var result = await dBContext.Friends.Where(f => f.UserFromId == request.UserId || f.UserToId == request.UserId)
                                            .Select(f => new MessageUser(f.UserFromId == request.UserId ? f.UserTo : f.UserFrom))
                                            .ToListAsync();
        return result;
    }
}
