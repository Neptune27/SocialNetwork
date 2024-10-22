using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;

namespace SocialNetwork.Profile.APIs.Profiles;

public class UpdateUsernameHandler(
    AppDBContext dBContext,
    IMediator mediator
    ) : IRequestHandler<UpdateUsernameRequest, bool>
{
    private readonly AppDBContext dBContext = dBContext;
    private readonly IMediator mediator = mediator;

    public async ValueTask<bool> Handle(UpdateUsernameRequest request, CancellationToken cancellationToken)
    {
        var user = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);

        if (user is null)
        {
            return false;
        }

        if (request.UserName is null)
        {
            return false;
        }

        if (await dBContext.Users.AnyAsync(u => u.UserName == request.UserName && u.Id != request.UserId, cancellationToken: cancellationToken))
        {
            return false;
        }

        user.UserName = request.UserName;

        //mediator.Send()

        return true;


    }
}
