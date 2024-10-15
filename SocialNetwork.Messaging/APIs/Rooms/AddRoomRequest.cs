using Mediator;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class AddRoomRequest(
    string createdBy,
    string roomName,
    IEnumerable<string> otherUsers
    ) : IRequest<int>
{
    public string CreatedBy { get; } = createdBy;
    public string RoomName { get; } = roomName;
    public IEnumerable<string> OtherUsers { get; } = otherUsers;
}
