﻿using Mediator;
using SocialNetwork.Messaging.Data;

namespace SocialNetwork.Messaging.APIs.Messages;

public class AddMessageHandler(
    AppDBContext dBContext,
    IMediator mediator 
    ) : IRequestHandler<AddMessageRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;
    private readonly IMediator mediator = mediator;

    public async ValueTask<bool> Handle(AddMessageRequest request, CancellationToken cancellationToken)
    {
        if (request == null)
        {
            return false;
        }
        await mediator.Publish(new NotifyMessageRequest(request.Message), cancellationToken).ConfigureAwait(false);
        
        await dBContext.Messages.AddAsync(request.Message, cancellationToken).ConfigureAwait(false);
        await dBContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        
        return true;
    }
}