using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Notifications.Data.Integrations;

public class HelloNotification(
    string userId
    )
{
    public string UserId { get; } = userId;
}
