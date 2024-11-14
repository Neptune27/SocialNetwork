using MassTransit;
using Mediator;
using SocialNetwork.Core.Integrations.Users;

namespace SocialNetwork.Profile.Integrations;

public class PublishFriendAddHandler(IBus bus) : IRequestHandler<PublishFriendAddRequest, bool>
{
    private readonly IBus bus = bus;

    public async ValueTask<bool> Handle(PublishFriendAddRequest request, CancellationToken cancellationToken)
    {
        await bus.Publish(new AddFriendDTO(request.FromUser, request.ToUser));
        return true;
    }
}
