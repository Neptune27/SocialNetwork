using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Notifications.Data;
using SocialNetwork.Notifications.Data.Models;
using SocialNetwork.Notifications.Hubs;

namespace SocialNetwork.Notifications.APIs;

public class GetNotificationHandler(
    AppDBContext context
    )
    : IRequestHandler<GetNotificationRequest, IEnumerable<Notification>>
{
    private readonly AppDBContext context = context;

    public async ValueTask<IEnumerable<Notification>> Handle(GetNotificationRequest request, CancellationToken cancellationToken)
    {
        var total = request.Total;
        var result = await context.Notifications
            .Where(it => it.UserId == request.UserId)
            .OrderByDescending(it => it.CreatedAt)
            .Take(total).ToListAsync(cancellationToken: cancellationToken);

        return result;

    }
}
