using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.DTOs.Friends;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Friends;

public class GetFriendsRequestHandler(AppDBContext dBContext) 
    : IRequestHandler<GetFriendsRequestRequest, List<FriendRequest>>
{
    private readonly AppDBContext dBContext = dBContext;


    public async ValueTask<List<FriendRequest>> Handle(GetFriendsRequestRequest request, CancellationToken cancellationToken)
    {
        var result = await dBContext.FriendRequests
            .Include(f => f.Sender)
            .Include(f => f.Reciever)
            .Where(f => f.Sender.Id == request.UserId || f.Reciever.Id == request.UserId)
            .ToListAsync(cancellationToken: cancellationToken);

        return result;
    }
}
