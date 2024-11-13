using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.DTOs.Friends;

namespace SocialNetwork.Profile.APIs.Friends;

public class GetFriendsHandler(AppDBContext dBContext) : IRequestHandler<GetFriendsRequest, List<FriendDTO>>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<List<FriendDTO>> Handle(GetFriendsRequest request, CancellationToken cancellationToken)
    {
        var result = await dBContext.Users
            .Where(u => u.Friends.Any(f => f.Id == request.UserId))
            .ToListAsync(cancellationToken: cancellationToken);

        return result.Select(r => new FriendDTO(r)).ToList();
    }
}
