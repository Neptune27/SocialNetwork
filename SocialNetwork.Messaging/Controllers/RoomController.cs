﻿using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Messaging.APIs.Messages;
using SocialNetwork.Messaging.APIs.Rooms;
using SocialNetwork.Messaging.Data.DTOs;
using System;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialNetwork.Messaging.Controllers;

[Authorize]
[Route("[controller]")]
[ApiController]
public class RoomController(
    IMediator mediator
    ) : ControllerBase
{
    private readonly IMediator mediator = mediator;

    // GET: api/<ValuesController>
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var user = HttpContext.User.Claims.GetClaimByUserId();
        if (user == null)
        {
            return BadRequest();
        }

        var result = await mediator.Send(new GetRoomsRequest(user.Value, (0, 10)));
        return Ok(result);
    }

    // GET api/<ValuesController>/5
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var result = await mediator.Send(new GetRoomRequest(id));

        return Ok(result);
    }

    // POST api/<ValuesController>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] AddRoomDTO dto)
    {
        var creator = HttpContext.User.Claims
            .FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier)?.Value;


        if (creator == null)
        {
            return BadRequest("Unauthorized?");
        }


        var res = await mediator.Send(new AddRoomRequest(
            creator,
            dto.Name,
            dto.UserIds
            ));

        return Ok(res);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Patch(int id, [FromBody] string name)
    {
        var creator = HttpContext.User.Claims
         .FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier)?.Value;

        var result = await mediator.Send(new PatchNameRoomRequest(creator, id, name));

        if (result)
        {
            return Ok();
        }
        return BadRequest();
    }

    [HttpPatch("Image/{id}")]
    public async Task<IActionResult> PatchImage(int id, IFormFile file)
    {
        var creator = HttpContext.User.Claims
         .FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier)?.Value;


        if (file.Length == 0)
        {
            return BadRequest();
        }

        //file.jpg => jpg | .jpg
        var fileExtension = Path.GetExtension(file.FileName);


        var saveLocation = Path.Combine("Media", id.ToString(), $"profile{fileExtension}");
        var wwwPath = Path.Combine("www", saveLocation);
        var directory = Path.GetDirectoryName(wwwPath);
        Directory.CreateDirectory(directory);

        using var stream = System.IO.File.Create(wwwPath);

        await file.CopyToAsync(stream);

        var result = await mediator.Send(new PatchImageRoomRequest(creator, id, saveLocation));

        if (result)
        {
            return Ok();
        }
        return BadRequest();
    }

    [HttpPost("Call/{id}")]
    public async Task<IActionResult> Call(int id)
    {
        var creator = HttpContext.User.Claims
 .FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier)?.Value;

        var result = await mediator.Send(new NotifyCallRequest(creator, id));

        if (result)
        {
            return Ok();
        }
        return BadRequest();
    }

    //// PUT api/<ValuesController>/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    //// DELETE api/<ValuesController>/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
}
