using Mediator;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Messages;

public class GetMessageRequest(int messageId) : IRequest<Message>
{
    public int MessageId { get; } = messageId;
}
