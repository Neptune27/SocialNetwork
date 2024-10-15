using Mediator;
using SocialNetwork.Identity.Data.Models;

namespace SocialNetwork.Identity.APIs.Accounts;

public class GetAccountRequest(
    string username
    ) : IRequest<AppUser>
{
    public string Username { get; } = username;
}
