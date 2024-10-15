using Mediator;
using Microsoft.AspNetCore.Identity;
using SocialNetwork.Identity.Data.Models;

namespace SocialNetwork.Identity.APIs.Accounts;

public class AddToRoleRequest(AppUser user, string role) : IRequest<IdentityResult>
{
    public AppUser User { get; } = user;
    public string Role { get; } = role;
}
