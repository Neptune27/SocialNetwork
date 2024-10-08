using MassTransit;
using Mediator;
using Microsoft.AspNetCore.SignalR;
using SocialNetwork.Notifications.APIs;
using SocialNetwork.Notifications.Data.Models;
using SocialNetwork.Notifications.Hubs;

namespace SocialNetwork.Notifications.Integrations;

public class BroadcastNotificationConsumer(
    IHubContext<NotificationHub> _hubContext, 
    IMediator _mediator) : IConsumer<Notification>
{
    private readonly IHubContext<NotificationHub> _hubContext = _hubContext;
    private readonly IMediator mediator = _mediator;

    public async Task Consume(ConsumeContext<Notification> context)
    {
        var notification = context.Message;

        await mediator.Send(new AddNotificationRequest(notification));

        var type = notification.Type.ToString();

        var u = _hubContext.Clients.User(notification.UserId);

        await _hubContext.Clients.User(notification.UserId).SendAsync(type, notification);

    }
}
