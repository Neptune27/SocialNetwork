using Mediator;
using SocialNetwork.Notifications.Data.Models;

namespace SocialNetwork.Notifications.APIs;

public class GetNotificationRequest(string userId, int total = 10) 
    : IRequest<IEnumerable<Notification>>
{
    public string UserId { get; } = userId;
    public int Total { get; } = total;
}
