using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.DTOs.Friends;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Friends;

public class GetFriendRequestsHandler(AppDBContext dBContext) 
    : IRequestHandler<GetFriendRequestsRequest, List<FriendRequest>>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<List<FriendDTO>> Handle(GetFriendsRequest request, CancellationToken cancellationToken)
    {
        var result = await dBContext.Users
            .Where(u => u.Friends.Any(f => f.Id == request.UserId))
            .ToListAsync(cancellationToken: cancellationToken);

        return result.Select(r => new FriendDTO(r)).ToList();
    }

    public async ValueTask<List<FriendRequest>> Handle(GetFriendRequestsRequest request, CancellationToken cancellationToken)
    {
        var result = await dBContext.FriendRequests
            .Where(f => f.Sender.Id == request.UserId)
            .ToListAsync(cancellationToken: cancellationToken);

        return result;
    }
}
