using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;

namespace SocialNetwork.Messaging.APIs.Messages;

public class DeleteMessageHandler(
    AppDBContext dBContext
    ): IRequestHandler<DeleteMessageRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<bool> Handle(DeleteMessageRequest request, CancellationToken cancellationToken)
    {
        var message = await dBContext.Messages
            .FirstOrDefaultAsync(m => m.Id == request.MessageId 
                                   && m.User.Id == request.UserId);
        if (message == null)
        {
            return false;
        }

        message.Visibility = Core.Enums.EVisibility.HIDDEN;
        await dBContext.SaveChangesAsync(cancellationToken);

        return true;


    }
}
