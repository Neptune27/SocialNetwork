using Mediator;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Files;

public class NotifyFileProgressRequest(
    string userId,
    string fileName,
    double progress
    ) : IRequest<bool>
{
    public string UserId { get; } = userId;
    public string FileName { get; } = fileName;
    public double Progress { get; } = progress;
}