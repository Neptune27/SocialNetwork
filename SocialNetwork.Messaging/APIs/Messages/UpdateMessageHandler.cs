using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;

namespace SocialNetwork.Messaging.APIs.Messages;

public class UpdateMessageHandler : IRequestHandler<UpdateMessageRequest, bool>
{
    private readonly AppDBContext dBContext;

    public UpdateMessageHandler(AppDBContext dBContext)
    {
        this.dBContext = dBContext;
    }

    public async ValueTask<bool> Handle(UpdateMessageRequest request, CancellationToken cancellationToken)
    {
        var message = await dBContext.Messages
            .FirstOrDefaultAsync(m => m.Id == request.MessageID
                              && m.User.Id == request.UserID);
        if (message == null)
        {
            return false;
        }

        message.Content = request.Content;
        message.LastUpdated = DateTime.UtcNow;
        await dBContext.SaveChangesAsync(cancellationToken);

        return true;
    }
}
