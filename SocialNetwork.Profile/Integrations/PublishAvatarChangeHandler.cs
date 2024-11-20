using MassTransit;
using Mediator;
using SocialNetwork.Core.Integrations.Users;

namespace SocialNetwork.Profile.Integrations;

public class PublishAvatarChangeHandler(IBus bus) : IRequestHandler<PublishAvatarChangeRequest, bool>
{
    private readonly IBus bus = bus;

    public async ValueTask<bool> Handle(PublishAvatarChangeRequest request, CancellationToken cancellationToken)
    {
        UpdateUserAvatarDTO dto = new(request.UserId, request.ProfileUrl);
        await bus.Publish(dto, cancellationToken);
        return true;
    }
}
