using MassTransit;
using Mediator;
using SocialNetwork.Core.Integrations.Users;
using SocialNetwork.Core.Models;

namespace SocialNetwork.Profile.Integrations;

public class PublishFriendAddHandler(IBus bus) : IRequestHandler<PublishFriendAddRequest, bool>
{
    private readonly IBus bus = bus;

    public async ValueTask<bool> Handle(PublishFriendAddRequest request, CancellationToken cancellationToken)
    {
        AddFriendDTO basicFriend = new(request.FromUser, request.ToUser);

        await bus.Publish(basicFriend, cancellationToken);
        return true;
    }
}
