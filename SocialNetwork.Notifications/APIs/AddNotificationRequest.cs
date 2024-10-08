using Mediator;
using SocialNetwork.Notifications.Data.Models;

namespace SocialNetwork.Notifications.APIs;

public class AddNotificationRequest(Notification notification) : IRequest<Notification>
{
    public Notification Notification { get; } = notification;
}
