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
        var temp = await dBContext.Friends.ToListAsync();
        var result = await dBContext.Friends
            .Include(f => f.UserFrom)
            .Include(f => f.UserTo)
            .Where(f => f.UserFrom.Id == request.UserId || f.UserTo.Id == request.UserId)
            .ToListAsync(cancellationToken: cancellationToken);

        var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);

        return result.Select(r => r.UserFrom.Id == user.Id ? new FriendDTO(r.UserTo)
                                                : new FriendDTO(r.UserFrom)).ToList();
    }
}
