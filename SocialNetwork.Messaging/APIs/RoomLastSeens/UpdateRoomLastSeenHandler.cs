using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;
using RoomLastSeenModel = SocialNetwork.Messaging.Data.Models.RoomLastSeen;


namespace SocialNetwork.Messaging.APIs.RoomLastSeens;

public class UpdateRoomLastSeenHandler(AppDBContext dBContext) : IRequestHandler<UpdateRoomLastSeenRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<bool> Handle(UpdateRoomLastSeenRequest request, CancellationToken cancellationToken)
    {
        var room = await dBContext.RoomsLastSeen.FirstOrDefaultAsync(r => r.RoomId == request.RoomId && r.UserId == request.UserId);
        if (room == null) {
            RoomLastSeenModel rls = new()
            {
                RoomId = request.RoomId,
                LastSeen = DateTime.Now,
                UserId = request.UserId,
            };
            await dBContext.RoomsLastSeen.AddAsync(rls, cancellationToken);
            await dBContext.SaveChangesAsync();
            return true;
        }

        room.LastSeen = DateTime.Now;
        await dBContext.SaveChangesAsync();
        return true;
    }
}
