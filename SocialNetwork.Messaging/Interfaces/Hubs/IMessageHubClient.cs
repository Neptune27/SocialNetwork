using SocialNetwork.Messaging.Data.DTOs;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.Interfaces.Hubs;

public interface IMessageHubClient
{
    Task RecieveMessage(MessageResponseDTO message);

    Task RecieveFileProgressUpdate(FileUpdateProgressDTO progress);

    Task RecieveFileChangedUpdate(FileNameChangeDTO dto);
    Task RecieveRoomNameChanged(SignalRoomResponseDTO dto);
    Task RecieveRoomProfileChanged(SignalRoomResponseDTO dto);
    Task RecieveCall(SignalRoomResponseDTO dto);
}
