using Mediator;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Messages;

public class AddMessageRequest(
    Message message
    ) : IRequest<bool>
{
    public Message Message { get; } = message;
}