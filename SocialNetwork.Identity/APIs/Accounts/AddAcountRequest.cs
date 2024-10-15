using Mediator;
using Microsoft.AspNetCore.Identity;
using SocialNetwork.Identity.Data.Models;
using SocialNetwork.Identity.DTOs.Account;

namespace SocialNetwork.Identity.APIs.Accounts;

public class AddAccountRequest(AppUser data, string password) : IRequest<IdentityResult>
{
    public AppUser Data { get; } = data;

    public string Password { get; } = password;
}
