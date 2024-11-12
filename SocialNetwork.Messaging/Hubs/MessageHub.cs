using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Interfaces.Hubs;
using System.Security.Claims;

namespace SocialNetwork.Messaging.Hubs;

[Authorize]
public class MessageHub (AppDBContext dbContext) : Hub<IMessageHubClient>
{
    private readonly AppDBContext dbContext = dbContext;

    public static Dictionary<string, List<string>> ConnectedUser = [];

    public override async Task OnConnectedAsync()
    {
        var user = Context.User;
        var id = user.Claims.GetClaimByUserId().Value;

        var doHaveConnection = ConnectedUser.TryGetValue(id, out var value);

        if (doHaveConnection)
        {
            value.Add(Context.ConnectionId);
        }
        else { 
            ConnectedUser.Add(id, [Context.ConnectionId]);
        }

        var rooms = dbContext.Rooms.Where(r => r.Users.Any(u => u.Id == id)).ToList();
        var task = rooms.Select(room => Groups.AddToGroupAsync(Context.ConnectionId, room.Id.ToString()));
        await Task.WhenAll(task);

        //Debug.WriteLine("Send other init");
        //await Clients.Others.SendAsync("InitRecieve", Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var user = Context.User;
        var id = user.Claims.GetClaimByUserId().Value;
        
        ConnectedUser.TryGetValue(id, out var value);
        value.Remove(Context.ConnectionId);

        await base.OnDisconnectedAsync(exception);
    }
}
