using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Helpers;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Messages;

public class AddMessageHandler(
    AppDBContext dBContext,
    IMediator mediator
    ) : IRequestHandler<AddMessageRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;
    private readonly IMediator mediator = mediator;

    private bool HandleImage(Message message)
    {
        var fileLocation = Path.Combine("./StaticFiles", "Output", message.User.Id, message.Content);
        var newLocation = Path.Combine("Media", message.Room.Id.ToString(), message.User.Id, message.Content);
        var saveLocation = Path.Combine("./wwwroot", newLocation);
        var dir = Path.GetDirectoryName(saveLocation);
        Directory.CreateDirectory(dir);


        message.Content = newLocation;
        File.Copy(fileLocation, saveLocation);
        return true;
    }

    private bool HandleFile(Message message)
    {
        var fileName = message.Content;
        var fileType = FileHelpers.GetFileType(fileName);
        switch (fileType)
        {
            case EFileType.BIN:
                break;
            case EFileType.IMAGE:
                return HandleImage(message);
            case EFileType.VIDEO:
                break;
            default:
                break;
        }
        return true;
    }

    public async ValueTask<bool> Handle(AddMessageRequest request, CancellationToken cancellationToken)
    {
        if (request == null)
        {
            return false;
        }

        if (request.Message.MessageType == Data.Enums.MessageType.Media)
        {
            HandleFile(request.Message);
        }

        await dBContext.Messages.AddAsync(request.Message, cancellationToken).ConfigureAwait(false);
        await dBContext.SaveChangesAsync(cancellationToken);

        var message = await dBContext.Messages.OrderByDescending(m => m.CreatedAt).FirstOrDefaultAsync(m => m.User.Id == request.Message.User.Id && m.Room.Id == request.Message.Room.Id);
        request.Message.Id = message.Id;
        await mediator.Send(new NotifyMessageRequest(request.Message), cancellationToken);

        return true;
    }
}
