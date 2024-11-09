using MassTransit.Internals;
using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.APIs.Rooms;

public class GetRoomsHandler(
    AppDBContext dBContext
    ) : IRequestHandler<GetRoomsRequest, List<Room>>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<List<Room>> Handle(GetRoomsRequest request, CancellationToken cancellationToken)
    {
        var user = dBContext.Users.FirstOrDefault(u => u.Id == request.UserId);
        (int From, int To) = request.Pagination;
        var total = To - From;

        return await dBContext.Rooms
            .Include(r => r.Messages
                            .OrderByDescending(m => m.CreatedAt)
                            .Take(10))
            .Include(r => r.Users)
            .Include(r => r.CreatedBy)
            .Where(r => r.Users.Contains(user))
            .OrderBy(r => r.LastUpdated)
            .Skip(From)
            .Take(total)
            .ToListAsync(cancellationToken: cancellationToken);
    }
}
