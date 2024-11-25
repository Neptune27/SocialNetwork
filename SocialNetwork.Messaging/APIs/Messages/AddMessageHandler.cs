using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Helpers;
using SocialNetwork.Messaging.APIs.RoomLastSeens;
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

    private bool HandleMedia(Message message)
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

    private bool HandleBin(Message message) {
        var uuid = Guid.NewGuid().ToString();

        var fileLocation = Path.Combine("./StaticFiles", "Media", message.User.Id, message.Content);
        var newLocation = Path.Combine("Media", message.Room.Id.ToString(), message.User.Id, uuid, message.Content);
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
                return HandleBin(message);
            case EFileType.IMAGE:
                return HandleMedia(message);
            case EFileType.VIDEO:
                return HandleMedia(message);
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
        var room = await dBContext.Rooms.FirstOrDefaultAsync(r => r.Id == request.Message.Room.Id);
        room.LastUpdated = DateTime.UtcNow;
        await dBContext.SaveChangesAsync();

        request.Message.Id = message.Id;
        await mediator.Send(new NotifyMessageRequest(request.Message), cancellationToken);
        await mediator.Send(new UpdateRoomLastSeenRequest(request.Message.User.Id, request.Message.Room.Id), cancellationToken);
        return true;
    }
}
