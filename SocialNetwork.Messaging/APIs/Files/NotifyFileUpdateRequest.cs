using Mediator;

namespace SocialNetwork.Messaging.APIs.Files;

public class NotifyFileUpdateRequest(string userId, string original, string changed) : IRequest<bool>
{
    public string UserId { get; } = userId;
    public string Original { get; } = original;
    public string Changed { get; } = changed;
}