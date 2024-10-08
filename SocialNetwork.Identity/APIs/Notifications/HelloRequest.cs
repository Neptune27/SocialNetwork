using Mediator;

namespace SocialNetwork.Identity.APIs.Notifications;

public class HelloRequest(string userId) : IRequest<bool>
{
    public string UserId { get; } = userId;
}
