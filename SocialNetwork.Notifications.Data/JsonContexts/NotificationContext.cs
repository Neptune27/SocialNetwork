using SocialNetwork.Notifications.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SocialNetwork.Notifications.Data.JsonContexts;


[JsonSerializable(typeof(Notification))]
public partial class NotificationContext : JsonSerializerContext
{
}
