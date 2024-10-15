using MassTransit;
using SocialNetwork.Core.Integrations.Users;
using SocialNetwork.Core.Models;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.Models;

namespace SocialNetwork.Messaging.Integrations;

public class AddMessageUserConsumer(AppDBContext dBContext) : IConsumer<BasicUser>
{
    private readonly AppDBContext dBContext = dBContext;


    public async Task Consume(ConsumeContext<BasicUser> context)
    {
        var user = new MessageUser(context.Message);
        await dBContext.Users.AddAsync(user);
        await dBContext.SaveChangesAsync();
    }
}
