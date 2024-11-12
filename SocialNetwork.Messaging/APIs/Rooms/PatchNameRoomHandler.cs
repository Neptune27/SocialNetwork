using Mediator;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Hubs;
using SocialNetwork.Messaging.Interfaces.Hubs;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class PatchNameRoomHandler(
        AppDBContext dBContext,
        IHubContext<MessageHub, IMessageHubClient> messageHubContext
    ) : IRequestHandler<PatchNameRoomRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;
    private readonly IHubContext<MessageHub, IMessageHubClient> messageHubContext = messageHubContext;

    public async ValueTask<bool> Handle(PatchNameRoomRequest request, CancellationToken cancellationToken)
    {
        var room = await dBContext.Rooms.FirstOrDefaultAsync(r => r.Id == request.RoomId 
                                                                && r.CreatedBy.Id == request.UserId);

        if (room == null)
        {
            return false;
        }

        room.Name = request.Name;
        await dBContext.SaveChangesAsync(cancellationToken);
        await messageHubContext.Clients.Group(request.RoomId.ToString()).RecieveRoomNameChanged(new(room));
        
        return true;
    }
}
