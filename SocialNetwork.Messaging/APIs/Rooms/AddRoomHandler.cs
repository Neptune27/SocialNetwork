using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.Enums;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class AddRoomHandler(
    AppDBContext dBContext,
    ILogger<AddRoomHandler> logger
    ) : IRequestHandler<AddRoomRequest, int>
{
    private readonly AppDBContext dBContext = dBContext;
    private readonly ILogger<AddRoomHandler> logger = logger;

    public async ValueTask<int> Handle(AddRoomRequest request, CancellationToken cancellationToken)
    {

        var creator = await dBContext.Users
            .FirstOrDefaultAsync(u => u.Id == request.CreatedBy, cancellationToken);

        if (creator == null)
        {
            logger.LogWarning("User {UserId} not found in AddRoomHandler", request.CreatedBy);
            return -1;
        }

        var otherUsers = await dBContext.Users
            .Where(u => request.OtherUsers.Contains(u.Id)).ToListAsync();
        
        

        var newRoom = new Room()
        {
            Users = [creator, ..otherUsers],
            CreatedBy = creator,
            LastUpdated = DateTime.UtcNow,
            Messages = [],
            Name = request.RoomName,
            Profile = "",
            RoomType = otherUsers.Count > 1 ? RoomType.Group : RoomType.Normal,
        };

        await dBContext.Rooms.AddAsync(newRoom, cancellationToken);
        return await dBContext.SaveChangesAsync(cancellationToken);
    }
}
