using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class GetRoomHandler(
    AppDBContext dBContext
    ) : IRequestHandler<GetRoomRequest, Room?>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<Room?> Handle(GetRoomRequest request, CancellationToken cancellationToken)
    {
        return await dBContext.Rooms
            .Include(it => it.Users)
            
            .FirstOrDefaultAsync(r => r.Id == request.RoomId, cancellationToken: cancellationToken);
    }
}
