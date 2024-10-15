using Mediator;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Identity.Data.Models;
using SocialNetwork.Identity.DTOs.Account;

namespace SocialNetwork.Identity.APIs.Accounts;

public class GetAccountHandler(
    UserManager<AppUser> userManager
    ) : IRequestHandler<GetAccountRequest, AppUser>
{
    public async ValueTask<AppUser> Handle(GetAccountRequest request, CancellationToken cancellationToken)
    {
        var username = request.Username;
        var user = await userManager.Users.
            FirstOrDefaultAsync(it => it.UserName == username, cancellationToken: cancellationToken);
        return user;
    }
}
