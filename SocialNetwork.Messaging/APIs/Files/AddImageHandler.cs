using MediaProcessor;
using Mediator;

namespace SocialNetwork.Messaging.APIs.Files;

public class AddImageHandler(IMediator mediator) : IRequestHandler<AddImageRequest, bool>
{
    public async ValueTask<bool> Handle(AddImageRequest request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;
        var fileName = request.FileName;

        var newName = Guid.NewGuid().ToString();

        var filePath = Path.Combine("./StaticFiles/", "Media", userId, fileName);
        var outputPath = Path.Combine("./StaticFiles/", "Output", userId, newName);
        
        await mediator.Send(new NotifyFileUpdateRequest(userId, fileName, newName+".webp"));

        var dir = Path.GetDirectoryName(outputPath);
        Directory.CreateDirectory(dir);

        await ImageConverter.DefaultConvert(filePath, outputPath);
        await mediator.Send(new NotifyFileProgressRequest(userId, fileName, 2), cancellationToken);

        return true;
    }
}
