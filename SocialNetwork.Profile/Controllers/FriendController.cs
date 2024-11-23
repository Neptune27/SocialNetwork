using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Profile.APIs.Friends;
using SocialNetwork.Profile.Data.DTOs.Friends;
using SocialNetwork.Profile.Data.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialNetwork.Profile.Controllers;


[Authorize]
[Route("api/[controller]")]
[ApiController]
public class FriendController(IMediator mediator) : ControllerBase
{
    private readonly IMediator mediator = mediator;

    public string Hello { get; set; }

    // GET: api/<FriendController>
    [HttpGet]
    public async Task<IEnumerable<FriendDTO>> Get()
    {
        
        var userId = HttpContext.User.Claims.GetClaimByUserId().Value;
        var friends = await mediator.Send(new GetFriendsRequest(userId));
        return friends;
    }

    [HttpGet("Request")]
    public async Task<IEnumerable<FriendRequest>> GetFriendRequest()
    {
        var userId = HttpContext.User.Claims.GetClaimByUserId().Value;
        var friendRequests = await mediator.Send(new GetFriendRequestsRequest(userId));
        return friendRequests;
    }

    [HttpPost("Request")]
    public async Task<IActionResult> PostFriendRequest([FromBody] string id)
    {
        var userId = HttpContext.User.Claims.GetClaimByUserId().Value;
        var result = await mediator.Send(new PostFriendRequestRequest(userId, id));

        if (!result)
        {
            return BadRequest();
        }

        return Ok();
    }

    // GET api/<FriendController>/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "value";
    }

    // POST api/<FriendController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<FriendController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<FriendController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
