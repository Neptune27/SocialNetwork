using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SocialNetwork.Messaging.Data;
using System.Security.Claims;

namespace SocialNetwork.Messaging.Hubs;

[Authorize]
public class MessageHub (AppDBContext dbContext) : Hub
{
    private readonly AppDBContext dbContext = dbContext;

    public override async Task OnConnectedAsync()
    {
        var user = Context.User;
        var id = user.Claims.FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier);

        var rooms = dbContext.Rooms.Where(r => r.Users.Any(u => u.Id == id.Value)).ToList();
        var task = rooms.Select(room => Groups.AddToGroupAsync(Context.ConnectionId, room.Id.ToString()));
        await Task.WhenAll(task);

        //Debug.WriteLine("Send other init");
        //await Clients.Others.SendAsync("InitRecieve", Context.ConnectionId);
        await base.OnConnectedAsync();
    }
}
