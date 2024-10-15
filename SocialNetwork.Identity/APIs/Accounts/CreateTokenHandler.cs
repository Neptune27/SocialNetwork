using Mediator;
using Microsoft.Win32;
using SocialNetwork.Identity.Data.Models;
using SocialNetwork.Identity.DTOs.Account;
using SocialNetwork.Identity.Interfaces.Services;
using SocialNetwork.Identity.Services;

namespace SocialNetwork.Identity.APIs.Accounts;

public class CreateTokenHandler(
    ITokenService tokenService
    ) : IRequestHandler<CreateTokenRequest, TokenResultDto>
{
    private readonly ITokenService tokenService = tokenService;

    public async ValueTask<TokenResultDto> Handle(CreateTokenRequest request, CancellationToken cancellationToken)
    {
        var appUser = request.AppUser;

        return new TokenResultDto(appUser.UserName, appUser.Email,
            await tokenService.CreateToken(appUser, request.Host));
    }
}
