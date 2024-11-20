using Mediator;
using Microsoft.AspNetCore.SignalR;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Hubs;
using SocialNetwork.Messaging.Interfaces.Hubs;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class LeaveRoomHandler(
    AppDBContext dBContext,
    IHubContext<MessageHub, IMessageHubClient> messageHubContext
    ) : IRequestHandler<LeaveRoomRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;
    private readonly IHubContext<MessageHub, IMessageHubClient> messageHubContext = messageHubContext;


    public async ValueTask<bool> Handle(LeaveRoomRequest request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;
        MessageHub.ConnectedUser.TryGetValue(userId, out var connectedIds);
        var removeTask = connectedIds.Select(id => messageHubContext.Groups.RemoveFromGroupAsync(request.RoomId.ToString(), id));
        await Task.WhenAll( removeTask );
        
        

        return true;
    }
}
