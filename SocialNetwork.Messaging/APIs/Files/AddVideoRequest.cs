using Mediator;

namespace SocialNetwork.Messaging.APIs.Files;

public class AddVideoRequest(string userId, string fileName) : IRequest<bool>
{
    public string UserId { get; } = userId;
    public string FileName { get; } = fileName;
}