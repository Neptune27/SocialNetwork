using Mediator;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Hubs;
using SocialNetwork.Messaging.Interfaces.Hubs;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class NotifyCallHandler(
        AppDBContext dBContext,
        IHubContext<MessageHub, IMessageHubClient> messageHubContext
    ) : IRequestHandler<NotifyCallRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;
    private readonly IHubContext<MessageHub, IMessageHubClient> messageHubContext = messageHubContext;

    public async ValueTask<bool> Handle(NotifyCallRequest request, CancellationToken cancellationToken)
    {
        var room = await dBContext.Rooms.FirstOrDefaultAsync(r => r.Id == request.RoomId, cancellationToken: cancellationToken);

        if (room is null) {
            return false;
        }

        MessageHub.ConnectedUser.TryGetValue(request.UserId, out var exceptConnection);
        exceptConnection ??= [];

        await messageHubContext.Clients.GroupExcept(request.RoomId.ToString(), exceptConnection).RecieveCall(new(room));

        return true;
    }
}
