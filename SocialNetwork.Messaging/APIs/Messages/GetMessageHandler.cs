using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Messages;

public class GetMessageHandler(
    AppDBContext dbContext
    ) : IRequestHandler<GetMessageRequest, Message>
{
    private readonly AppDBContext dbContext = dbContext;

    public async ValueTask<Message> Handle(GetMessageRequest request, CancellationToken cancellationToken)
    {
        return await dbContext.Messages.FirstOrDefaultAsync(m => m.Id == request.MessageId, cancellationToken);

    }
}
