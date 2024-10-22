using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Core.Extensions;

public static class ClaimExtensions
{
    public static Claim? GetClaimByUserId(this IEnumerable<Claim> claims)
    {
        return claims.FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier);
    }
}
