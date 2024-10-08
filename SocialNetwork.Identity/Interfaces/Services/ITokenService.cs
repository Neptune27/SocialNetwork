using SocialNetwork.Identity.Data.Models;

namespace SocialNetwork.Identity.Interfaces.Services;

public interface ITokenService
{
    Task<string> CreateToken(AppUser user, HostString host);

    //string GetToken(string token);

}
