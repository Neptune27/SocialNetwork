using Mediator;
using Microsoft.AspNetCore.SignalR;
using SocialNetwork.Notifications.Data;
using SocialNetwork.Notifications.Data.Models;
using SocialNetwork.Notifications.Hubs;
using System.Text.Json;

namespace SocialNetwork.Notifications.APIs;

public class AddNotificationHandler (
    AppDBContext context
    )
    : IRequestHandler<AddNotificationRequest, Notification>
{
    private readonly AppDBContext context = context;

    public async ValueTask<Notification> Handle(AddNotificationRequest request, CancellationToken cancellationToken)
    {

        var userId = request.Notification.UserId;

        await context.Notifications.AddAsync(request.Notification, cancellationToken);


        await context.SaveChangesAsync(cancellationToken);
        //await hub.Clients.User(userId).SendAsync(request.Notification.ToJson(), cancellationToken: cancellationToken);
        
        return request.Notification;
    
    }
}
