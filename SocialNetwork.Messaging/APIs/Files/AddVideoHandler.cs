using MediaProcessor;
using Mediator;
using System.Diagnostics;

namespace SocialNetwork.Messaging.APIs.Files;

public class AddVideoHandler(IMediator mediator) : IRequestHandler<AddVideoRequest, bool>
{

    public async Task UpdateProgress(TimeSpan timeSpan)
    {

    }

    public async ValueTask<bool> Handle(AddVideoRequest request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;
        var fileName = request.FileName;

        var newName = Guid.NewGuid().ToString();

        var filePath = Path.Combine("./StaticFiles/", "Media", userId, fileName);
        var outputPath = Path.Combine("./StaticFiles/", "Output", userId, newName);

        await mediator.Send(new NotifyFileUpdateRequest(userId, fileName, newName + ".mp4"));

        var dir = Path.GetDirectoryName(outputPath);
        Directory.CreateDirectory(dir);

        await VideoConverter.Convert(filePath, outputPath, (a) =>
        {
            mediator.Send(new NotifyFileProgressRequest(userId, fileName, (a/100) + 1), cancellationToken);

            Debug.WriteLine(a.ToString());
        });


        return true;
    }
}
