using Mediator;
using SocialNetwork.Identity.Data.Models;
using SocialNetwork.Identity.DTOs.Account;

namespace SocialNetwork.Identity.APIs.Accounts;

public class CreateTokenRequest(
    AppUser appUser,
    HostString host
    ) : IRequest<TokenResultDto>
{
    public AppUser AppUser { get; } = appUser;
    public HostString Host { get; } = host;
}
