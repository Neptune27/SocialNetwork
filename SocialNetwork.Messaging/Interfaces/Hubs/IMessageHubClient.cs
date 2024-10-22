using SocialNetwork.Messaging.Data.DTOs;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.Interfaces.Hubs;

public interface IMessageHubClient
{
    Task RecieveMessage(Message message);

}
