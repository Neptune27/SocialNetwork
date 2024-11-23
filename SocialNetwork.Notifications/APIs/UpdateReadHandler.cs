using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Notifications.Data;

namespace SocialNetwork.Notifications.APIs;

public class UpdateReadHandler(AppDBContext dBContext) : IRequestHandler<UpdateReadRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<bool> Handle(UpdateReadRequest request, CancellationToken cancellationToken)
    {
        var notifications = await dBContext.Notifications
            .Where(n => n.UserId == request.UserId)
            .OrderByDescending(n => n.CreatedAt)
            .Take(10).ToListAsync();

        notifications.ForEach(n => { n.IsRead = true; });
        await dBContext.SaveChangesAsync();
        return true;
    }
}
