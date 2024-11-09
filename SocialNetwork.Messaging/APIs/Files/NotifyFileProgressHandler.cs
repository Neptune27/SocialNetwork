using Mediator;
using Microsoft.AspNetCore.SignalR;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.DTOs;
using SocialNetwork.Messaging.Hubs;
using SocialNetwork.Messaging.Interfaces.Hubs;

namespace SocialNetwork.Messaging.APIs.Files;

public class NotifyFileProgressHandler(
    IHubContext<MessageHub, IMessageHubClient> messageHubContext 
    ) : IRequestHandler<NotifyFileProgressRequest, bool>
{
    private readonly IHubContext<MessageHub, IMessageHubClient> messageHubContext = messageHubContext;

    public async ValueTask<bool> Handle(NotifyFileProgressRequest request, CancellationToken cancellationToken)
    {
        await messageHubContext.Clients.User(request.UserId).RecieveFileProgressUpdate(new(request.FileName, request.Progress));
        return true;
    }
}
