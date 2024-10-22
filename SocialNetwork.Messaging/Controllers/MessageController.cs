﻿using Mediator;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Messaging.APIs.Messages;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Messaging.Data.DTOs;
using SocialNetwork.Messaging.Data.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialNetwork.Messaging.Controllers;

[Route("[controller]")]
[ApiController]
public class MessageController(
    IMediator mediator,
    AppDBContext dBContext
    ) : ControllerBase
{
    private readonly AppDBContext dBContext = dBContext;

    // GET: api/<MessageController>
    [HttpGet]
    public IEnumerable<string> Get()
    {
        return new string[] { "value1", "value2" };
    }

    // GET api/<MessageController>/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "value";
    }

    // POST api/<MessageController>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] MessageDTO dto)
    {
        var user = HttpContext.User.Claims.GetClaimByUserId();
        Message replyTo = null;

        if (dto.ReplyToId != 0)
        {
            replyTo = await mediator.Send(new GetMessageRequest(dto.ReplyToId));
        }


        var mUser = await dBContext.Users.FirstOrDefaultAsync(u => u.Id == user.Value);

        var room = await dBContext.Rooms.FirstOrDefaultAsync(r => r.Id == dto.RoomId);

        Message message = new()
        {
            MessageType = dto.MessageType,
            Content = dto.Content,
            CreatedAt = DateTime.UtcNow,
            LastUpdated = DateTime.UtcNow,
            ReplyTo = replyTo,
            Room = room,
            User = mUser
        };

        var res = await mediator.Send(new AddMessageRequest(message));
        return Ok(res);

    }

    // PUT api/<MessageController>/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] string value)
    {
        var user = HttpContext.User.Claims.GetClaimByUserId();
        var result = await mediator.Send(new UpdateMessageRequest(user.Value, id, value));

        if (result)
        {
            return Ok();
        }

        return BadRequest();


    }

    // DELETE api/<MessageController>/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = HttpContext.User.Claims.GetClaimByUserId();
        var result = await mediator.Send(new DeleteMessageRequest(id, user.Value));
        return Ok(result);

    }
}
