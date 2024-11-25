using Mediator;

namespace SocialNetwork.Messaging.APIs.Messages;

public class GetTotalMissedMessageRequest(string userId) : IRequest<int>
{
    public string UserId { get; } = userId;
}
