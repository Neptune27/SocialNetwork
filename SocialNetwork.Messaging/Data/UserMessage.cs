namespace SocialNetwork.Messaging.Data;

public record UserMessage(string Sender, string Message, string ConnectionId, DateTime SentTime)
{
}
