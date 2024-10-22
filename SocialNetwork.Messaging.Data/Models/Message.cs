using SocialNetwork.Core.Enums;
using SocialNetwork.Core.Models;
using SocialNetwork.Messaging.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SocialNetwork.Messaging.Data.Models;

public class Message : BaseModel
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }

    public BasicUser User { get; set; }


    public Room Room { get; set; }

    public string Content { get; set; }

    public MessageType MessageType { get; set; }

    public Message? ReplyTo { get; set; }


}


