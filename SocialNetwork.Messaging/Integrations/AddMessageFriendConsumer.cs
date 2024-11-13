using MassTransit;
using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Integrations.Users;
using SocialNetwork.Core.Models;
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
            .FirstOrDefaultAsync(u => u.Id == data.ToUserId);

        var user2 = await dBContext.Users
            .FirstOrDefaultAsync(u => u.Id == data.FromUserId);

        if (user == null)
        {
            throw new NullReferenceException($"User {data.ToUserId} not found, maybe database is desync?");
        }

        if (user2 == null)
        {
            throw new NullReferenceException($"User {data.FromUserId} not found, maybe database is desync?");
        }

        var friend = new BasicFriend()
        {
            CreatedAt = DateTime.Now,
            LastUpdated = DateTime.Now,
            UserFrom = user,
            UserTo = user2,
            Visibility = Core.Enums.EVisibility.PUBLIC
        };

        var friend2 = new BasicFriend()
        {
            CreatedAt = DateTime.Now,
            LastUpdated = DateTime.Now,
            UserFrom = user2,
            UserTo = user,
            Visibility = Core.Enums.EVisibility.PUBLIC
        };

        //user.Add(friend2);
        //user2.FriendDetails.Add(friend);

        await dBContext.AddRangeAsync(friend, friend2);


        await dBContext.SaveChangesAsync();

    }
}
