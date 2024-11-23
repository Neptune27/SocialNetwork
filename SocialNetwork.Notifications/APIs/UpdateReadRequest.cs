using Mediator;

namespace SocialNetwork.Notifications.APIs;

public class UpdateReadRequest(string userId) : IRequest<bool>
{
    public string UserId { get; } = userId;
}