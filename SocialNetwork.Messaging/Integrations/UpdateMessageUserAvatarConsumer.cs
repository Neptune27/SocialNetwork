using MassTransit;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Integrations.Users;
using SocialNetwork.Messaging.Data;
using System.Diagnostics;

namespace SocialNetwork.Messaging.Integrations;

public class UpdateMessageUserAvatarConsumer(AppDBContext dBContext) : IConsumer<UpdateUserAvatarDTO>
{
    private readonly AppDBContext dBContext = dBContext;

    public async Task Consume(ConsumeContext<UpdateUserAvatarDTO> context)
    {
        var message = context.Message;

        var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == message.UserId);

        if (user == null) {
            Debug.WriteLine("Huh???");
            return;
        }

        user.Picture = message.ProfileUrl;
        await dBContext.SaveChangesAsync();
    }
}
