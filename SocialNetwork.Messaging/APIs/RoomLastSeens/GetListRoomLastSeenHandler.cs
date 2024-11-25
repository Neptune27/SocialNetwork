using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.RoomLastSeens;

public class GetListRoomLastSeenHandler(AppDBContext dBContext) : IRequestHandler<GetListRoomLastSeenRequest, List<RoomLastSeen>>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<List<RoomLastSeen>> Handle(GetListRoomLastSeenRequest request, CancellationToken cancellationToken)
    {
        return await dBContext.RoomsLastSeen.Where(rls => rls.UserId == request.UserId).ToListAsync(cancellationToken: cancellationToken);
    }
}
