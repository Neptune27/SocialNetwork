using MassTransit;
using Mediator;
using SocialNetwork.Notifications.Data.Models;

namespace SocialNetwork.Identity.APIs.Notifications;

public class HelloHandler(
    IBus bus
    )
    : IRequestHandler<HelloRequest, bool>
{
    private readonly IBus bus = bus;

    public async ValueTask<bool> Handle(HelloRequest request, CancellationToken cancellationToken)
    {
        var res = new Notification()
        {
            UserId = request.UserId,
            CreatedAt = DateTime.UtcNow,
            FromId = request.UserId,
            IsRead = false,
            Message = "Hello",
            Type = ENotificationType.OTHER
        };

        await bus.Publish(res, cancellationToken: cancellationToken);
        return true;


    }
}
