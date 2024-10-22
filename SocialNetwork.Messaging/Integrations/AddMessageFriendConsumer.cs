using MassTransit;
using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Integrations.Users;
using SocialNetwork.Messaging.Data;

namespace SocialNetwork.Messaging.Integrations;

public class AddMessageFriendConsumer(
    AppDBContext dBContext,
    ILogger<AddMessageFriendConsumer> logger
    ) : IConsumer<AddFriendDTO>
{
    private readonly AppDBContext dBContext = dBContext;
    private readonly ILogger<AddMessageFriendConsumer> logger = logger;

    public async Task Consume(ConsumeContext<AddFriendDTO> context)
    {
        var data = context.Message;
        var user = await dBContext.Users
            .Include(u => u.Friends)
            .FirstOrDefaultAsync(u => u.Id == data.ToUserId);

        var user2 = await dBContext.Users
            .Include(u => u.Friends)
            .FirstOrDefaultAsync(u => u.Id == data.FromUserId);

        if (user == null)
        {
            throw new NullReferenceException($"User {data.ToUserId} not found, maybe database is desync?");
        }

        if (user2 == null)
        {
            throw new NullReferenceException($"User {data.FromUserId} not found, maybe database is desync?");
        }

        user.Friends.Add(user2);
        user2.Friends.Add(user);

        await dBContext.SaveChangesAsync();

    }
}
