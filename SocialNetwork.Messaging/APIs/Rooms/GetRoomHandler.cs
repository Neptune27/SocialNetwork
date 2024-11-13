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
            .Include(r => r.Messages
                            .OrderByDescending(m => m.CreatedAt)
                            .Take(1))
            .Include(r => r.Users)
            .Include(r => r.CreatedBy)
            .FirstOrDefaultAsync(r => r.Id == request.RoomId, cancellationToken: cancellationToken);
    }
}
