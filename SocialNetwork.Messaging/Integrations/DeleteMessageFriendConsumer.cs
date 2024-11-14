using MassTransit;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Integrations.Users;
using SocialNetwork.Messaging.Data;

namespace SocialNetwork.Messaging.Integrations;

public class DeleteMessageFriendConsumer(
    AppDBContext dBContext
    ) : IConsumer<DeleteFriendDTO>
{
    private readonly AppDBContext dBContext = dBContext;

    public async Task Consume(ConsumeContext<DeleteFriendDTO> context)
    {
        var data = context.Message;
        var friend = await dBContext.Friends
            .FirstOrDefaultAsync(u => u.UserFrom.Id == data.FromUserId || u.UserTo.Id == data.ToUserId);

        var friendOther = await dBContext.Friends
            .FirstOrDefaultAsync(u => u.UserFrom.Id == data.ToUserId || u.UserTo.Id == data.FromUserId);

        if (friend is null && friendOther is null)
        {
            throw new NullReferenceException($"User {data.ToUserId} or {data.FromUserId} not found, maybe database is desync?");
        }

        if (friend is not null)
        {
            dBContext.Friends.Remove(friend);
        }

        if (friendOther is not null)
        {
            dBContext.Friends.Remove(friendOther);
        }

        await dBContext.SaveChangesAsync();

    }
}
