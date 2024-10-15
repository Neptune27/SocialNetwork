using MassTransit;
using Mediator;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Integrations.Users;
using SocialNetwork.Core.Models;
using SocialNetwork.Identity.Data.Models;
using SocialNetwork.Identity.DTOs.Account;
using System.Runtime;

namespace SocialNetwork.Identity.APIs.Accounts;

public class PublishAccountInternalHandler(
    IBus bus,
    UserManager<AppUser> userManager,
    ILogger<PublishAccountInternalHandler> logger
    ) : IRequestHandler<PublishAccountInternalRequest, bool>
{
    private readonly IBus bus = bus;
    private readonly UserManager<AppUser> userManager = userManager;
    private readonly ILogger<PublishAccountInternalHandler> logger = logger;

    public async ValueTask<bool> Handle(PublishAccountInternalRequest request, CancellationToken cancellationToken)
    {
        RegisterDto data = request.Data;

        var user = await userManager.Users.FirstOrDefaultAsync(it => it.UserName == data.UserName, cancellationToken);

        if (user == null)
        {
            logger.LogCritical("User {Username} not found in the database", data.UserName);
            return false;
        }

        var basicUser = new BasicUser()
        {
            Id = user.Id,
            Name = user.UserName,
            Picture = ""
        };

        var profileUser = new Profile.Data.Models.User()
        {
            Id = user.Id,
            Background = "",
            ProfilePicture = "",
            BirthDay = data.BirthDay,
            CreatedAt = DateTime.UtcNow,
            Friends = [],
            FirstName = data.FirstName,
            LastName = data.LastName,
            UserName = user.UserName,
            LastUpdated = DateTime.UtcNow,
            Github = "",
            Location = "",
            Instagram = "",
            Twitter = ""
        };


        await bus.Publish(basicUser, cancellationToken);
        await bus.Publish(profileUser, cancellationToken);
        
        return true;


    }
}
