using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Messaging.APIs.Messages;
using SocialNetwork.Messaging.APIs.Rooms;
using SocialNetwork.Messaging.Data.DTOs;
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
        var user = HttpContext.User.Claims.GetUserId();
        if (user == null)
        {
            return BadRequest();
        }

        var result = await mediator.Send(new GetRoomsRequest(user.Value));
        return Ok(result);
    }

    // GET api/<ValuesController>/5
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var result = await mediator.Send(new GetRoomRequest(id));

        return Ok(new
        {
            result = result,
            user = result.Users
        });
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
