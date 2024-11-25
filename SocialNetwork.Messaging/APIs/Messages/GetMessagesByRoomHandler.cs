using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.APIs.RoomLastSeens;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Messages;

public class GetMessagesByRoomHandler(
    AppDBContext dBContext
    ) : IRequestHandler<GetMessagesByRoomRequest, List<Message>>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<List<Message>> Handle(GetMessagesByRoomRequest request, CancellationToken cancellationToken)
    {

        return await dBContext.Messages
                        .Where(m => m.CreatedAt <= request.FromTime
                                 && m.Room.Id == request.RoomId)
                        .Include(m => m.User)
                        .OrderByDescending(m => m.CreatedAt)
                        .Take(request.Total)
                        .ToListAsync(cancellationToken: cancellationToken);

    }
}
