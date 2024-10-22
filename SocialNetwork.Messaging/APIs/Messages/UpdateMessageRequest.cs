using Mediator;

namespace SocialNetwork.Messaging.APIs.Messages;

public class UpdateMessageRequest: IRequest<bool>
{
    public string UserID { get; }
    public int MessageID { get; }
    public string Content { get; }

    public UpdateMessageRequest(string userID, int messageID, string content)
    {
        UserID = userID;
        MessageID = messageID;
        Content = content;
    }
}
