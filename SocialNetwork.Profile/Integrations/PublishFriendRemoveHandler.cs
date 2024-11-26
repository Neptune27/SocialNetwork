using MassTransit;
using Mediator;
using SocialNetwork.Core.Integrations.Users;

namespace SocialNetwork.Profile.Integrations;

public class PublishFriendRemoveHandler(IBus bus) : IRequestHandler<PublishFriendRemoveRequest, bool>
{
    private readonly IBus bus = bus;

    public async ValueTask<bool> Handle(PublishFriendRemoveRequest request, CancellationToken cancellationToken)
    {
        await bus.Publish(new DeleteFriendDTO(request.FromUser, request.ToUser), cancellationToken);
        return true;
    }
}
