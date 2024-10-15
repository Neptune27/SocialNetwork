using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SocialNetwork.Messaging.Data;
using System.Diagnostics;
using System.Text.Json;

namespace SocialNetwork.Messaging.Hubs;

public record RTCData(string id, dynamic signal) { }

[Authorize]
public class VideoHub : Hub
{
    private static readonly List<UserMessage> MessageHistory = [];

    public async Task NewUser(string username)
    {
        var userInfo = new UserInfo(username, Context.ConnectionId);
        await Clients.Others.SendAsync(username, JsonSerializer.Serialize(userInfo));
    }

    public async Task HelloUser(string userName, string user)
    {
        var userInfo = new UserInfo(userName, Context.ConnectionId);
        await Clients.Client(user).SendAsync("UserSaidHello", JsonSerializer.Serialize(userInfo));
    }

    public async Task SendSignal(string signal, string user)
    {
        await Clients.Client(user).SendAsync("SendSignal", Context.ConnectionId, signal);
    }


    public override async Task OnConnectedAsync()
    {


        //Debug.WriteLine("Send other init");
        //await Clients.Others.SendAsync("InitRecieve", Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public async Task JoinRoom(string id)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, id);
        await Clients.OthersInGroup(id).SendAsync("InitRecieve", Context.ConnectionId);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await Clients.All.SendAsync("UserDisconnect", Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }
    public async Task PostMessage(string content)
    {
        var senderId = Context.ConnectionId;
        var userMessage = new UserMessage(senderId, content, Context.ConnectionId, DateTime.UtcNow);
        MessageHistory.Add(userMessage);
        await Clients.Others.SendAsync("ReceiveMessage", senderId, content, userMessage.SentTime);
    }

    public async Task InitReceive ()
    {
        
        await Clients.Others.SendAsync("InitReceive", Context.ConnectionId);
    }
    public async Task InitSend(string Id)
    {
        Debug.WriteLine($"Init sent by {Context.ConnectionId} to {Id}");
        await Clients.Client(Id).SendAsync("InitSend", Context.ConnectionId);
    }


    public async Task SignalTo(string data) 
    {
        var datas = JsonSerializer.Deserialize<RTCData>(data);
        Debug.WriteLine($"Sending signal from {Context.ConnectionId} to {datas.id} with signal: {datas.signal}");


        var userData = new RTCData(Context.ConnectionId, datas.signal);

        await Clients.Client(datas.id).SendAsync("SignalTo", userData);
    }



    public async Task Signal(string content)
    {

        await Clients.Others.SendAsync("GetSignal", content);
    }

    public async Task RetrieveMessageHistory() =>
        await Clients.Caller.SendAsync("MessageHistory", MessageHistory);
}
