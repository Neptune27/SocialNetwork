using MassTransit.Configuration;
using Mediator;

namespace SocialNetwork.Messaging.APIs.Messages;

public class DeleteMessageRequest : IRequest<bool>
{
    public int MessageId { get; }
    public string UserId { get; }

    public DeleteMessageRequest(
        int messageId, 
        string userId
    )
    {
        MessageId = messageId;
        UserId = userId;
    }
}