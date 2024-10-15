using MassTransit;
using SocialNetwork.Core.Models;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.Integrations;

public class AddUserConsumer(AppDBContext dBContext) : IConsumer<User>
{
    private readonly AppDBContext dBContext = dBContext;


    public async Task Consume(ConsumeContext<User> context)
    {
        var user = context.Message;
        await dBContext.Users.AddAsync(user);
        await dBContext.SaveChangesAsync();
    }
}
