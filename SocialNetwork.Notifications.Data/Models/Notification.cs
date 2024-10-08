using Microsoft.EntityFrameworkCore.ValueGeneration;
using SocialNetwork.Notifications.Data.JsonContexts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SocialNetwork.Notifications.Data.Models;

public enum ENotificationType
{
    OTHER = 0,
    REACTION = 1,
    MESSAGE = 2,
    POST = 3,
    FRIEND = 4,
}

public class Notification
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public string Id { get; set; }

    [Required]
    public string UserId { get; set; }

    [Required]
    public string FromId { get; set; }

    [Required]
    public ENotificationType Type { get; set; }

    [Required]
    public bool IsRead { get; set; }

    [Required]
    public string Message { get; set; }

    public DateTime CreatedAt { get; set; }

    public string ToJson() => JsonSerializer.Serialize(this, NotificationContext.Default.Notification);

}
