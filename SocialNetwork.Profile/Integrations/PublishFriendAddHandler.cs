using MassTransit;
using Mediator;

namespace SocialNetwork.Profile.Integrations;

public class PublishFriendAddHandler(IBus bus) : IRequestHandler<PublishFriendAddRequest, bool>
{
    private readonly IBus bus = bus;

    public async ValueTask<bool> Handle(PublishFriendAddRequest request, CancellationToken cancellationToken)
    {
        bus.Publish();
    }
}
