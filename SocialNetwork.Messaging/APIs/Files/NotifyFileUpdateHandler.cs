using Mediator;
using Microsoft.AspNetCore.SignalR;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Hubs;
using SocialNetwork.Messaging.Interfaces.Hubs;

namespace SocialNetwork.Messaging.APIs.Files;

public class NotifyFileUpdateHandler(
        IHubContext<MessageHub, IMessageHubClient> messageHubContext
    ) : IRequestHandler<NotifyFileUpdateRequest, bool>
{
    private readonly IHubContext<MessageHub, IMessageHubClient> messageHubContext = messageHubContext;

    public async ValueTask<bool> Handle(NotifyFileUpdateRequest request, CancellationToken cancellationToken)
    {
        await messageHubContext.Clients.User(request.UserId).RecieveFileChangedUpdate(new(request.Original, request.Changed));
        return true;
    }
}
