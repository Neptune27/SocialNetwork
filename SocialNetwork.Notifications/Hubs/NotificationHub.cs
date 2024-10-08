using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Diagnostics;

namespace SocialNetwork.Notifications.Hubs;

public class NotificationHub(
    IMediator mediator, 
    ILogger<NotificationHub> logger) : Hub
{
    private readonly IMediator mediator = mediator;
    private readonly ILogger<NotificationHub> logger = logger;

    public override async Task OnConnectedAsync()
    {

        //Debug.WriteLine($"User {Context.User.Identity.Name} connected with Id: {Context.ConnectionId}");
        await base.OnConnectedAsync();
    }

}
