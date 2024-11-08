using SocialNetwork.Core.Models;
using SocialNetwork.Messaging.Data.Enums;
using SocialNetwork.Messaging.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Messaging.Data.DTOs;

public class MessageResponseDTO
{
    public MessageResponseDTO(int id, UserResponseDTO user, SignalRoomResponseDTO room, string content, MessageType messageType, MessageResponseDTO? replyTo)
    {
        Id = id;
        User = user;
        Room = room;
        Content = content;
        MessageType = messageType;
        ReplyTo = replyTo;
    }

    public MessageResponseDTO(Message message)
    {
        Id = message.Id;
        User = new UserResponseDTO(message.User);
        Room = new SignalRoomResponseDTO(message.Room);
        Content = message.Content;
        MessageType = message.MessageType;
        ReplyTo = message.ReplyTo == null ? null : new MessageResponseDTO(message);
    }

    public int Id { get; set; }

    public UserResponseDTO User { get; set; }

    public SignalRoomResponseDTO Room { get; set; }

    public string Content { get; set; }

    public MessageType MessageType { get; set; }

    public MessageResponseDTO? ReplyTo { get; set; }
}
