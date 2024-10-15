using MassTransit;
using SocialNetwork.Core.Integrations.Users;
using SocialNetwork.Core.Models;
using SocialNetwork.Post.Data;

namespace SocialNetwork.Post.Integrations;

public class AddPostUserConsumer(AppDBContext dBContext) : IConsumer<BasicUser>
{
    private readonly AppDBContext dBContext = dBContext;


    public async Task Consume(ConsumeContext<BasicUser> context)
    {
        var user = context.Message;
        await dBContext.Users.AddAsync(user);
        await dBContext.SaveChangesAsync();
    }
}
