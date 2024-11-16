using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Core.Integrations.Users;

public record UpdateUserAvatarDTO(string UserId, string ProfileUrl)
{
    
}
