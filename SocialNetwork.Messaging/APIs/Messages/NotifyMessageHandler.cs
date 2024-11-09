using Mediator;
using Microsoft.AspNetCore.SignalR;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.DTOs;
using SocialNetwork.Messaging.Hubs;
using SocialNetwork.Messaging.Interfaces.Hubs;

namespace SocialNetwork.Messaging.APIs.Messages;

public class NotifyMessageHandler(
    AppDBContext dBContext,
    IHubContext<MessageHub, IMessageHubClient> messageHubContext 
    ) : IRequestHandler<NotifyMessageRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;
    private readonly IHubContext<MessageHub, IMessageHubClient> messageHubContext = messageHubContext;

    public async ValueTask<bool> Handle(NotifyMessageRequest request, CancellationToken cancellationToken)
    {
        //await messageHubContext.Clients.All.RecieveMessage(request.Message);
        await messageHubContext.Clients.Group(request.Message.Room.Id.ToString()).RecieveMessage(new(request.Message));
        return true;
    }
}
