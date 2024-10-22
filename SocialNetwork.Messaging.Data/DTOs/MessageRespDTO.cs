using SocialNetwork.Messaging.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Messaging.Data.DTOs;


public class MessageRespDTO
{
    public int RoomId { get; set; }

    public string Content { get; set; }

    public MessageType MessageType { get; set; }

    public int ReplyToId { get; set; }

}
