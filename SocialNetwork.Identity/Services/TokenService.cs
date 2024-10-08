using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SocialNetwork.Identity.Interfaces.Services;
using SocialNetwork.Identity.Data.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace SocialNetwork.Identity.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration configuration;
    private readonly UserManager<AppUser> userManager;
    private readonly SymmetricSecurityKey key;

    private readonly JwtSecurityTokenHandler tokenHandler = new();

    public TokenService(IConfiguration configuration, UserManager<AppUser> userManager)
    {
        this.configuration = configuration;
        this.userManager = userManager;
        key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(configuration["JWT:SigningKey"])
            );

    }

    public async Task<string> CreateToken(AppUser user, HostString host)
    {
        List<Claim> claims = [
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
            ];


        var roles = await userManager.GetRolesAsync(user);

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            SigningCredentials = creds,
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddMinutes(10),
            Issuer = configuration["JWT:Issuer"],
            Audience = host.Value
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
