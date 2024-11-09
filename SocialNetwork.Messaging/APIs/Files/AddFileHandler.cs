using Mediator;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Messaging.APIs.Files;

public class AddFileHandler(IMediator mediator) : IRequestHandler<AddFileRequest, bool>
{
    public async ValueTask<bool> Handle(AddFileRequest request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;
        var fileName = request.FileName;

        //var newName = Guid.NewGuid().ToString();

        //var filePath = Path.Combine("./StaticFiles/", "Media", userId, fileName);
        //var outputPath = Path.Combine("./StaticFiles/", "Output", userId, newName);

        await mediator.Send(new NotifyFileProgressRequest(userId, fileName, 2), cancellationToken);


        return true;
    }
}
