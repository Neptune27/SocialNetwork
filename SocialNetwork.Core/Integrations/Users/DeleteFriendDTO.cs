using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Core.Integrations.Users;

public class DeleteFriendDTO(string fromUserId, string toUserId)
{
    public string FromUserId { get; } = fromUserId;
    public string ToUserId { get; } = toUserId;
}

