using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Messaging.APIs.Friends;
using SocialNetwork.Messaging.Data.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialNetwork.Messaging.Controllers;

[Authorize]
[Route("[controller]")]
[ApiController]
public class FriendController(IMediator mediator) : ControllerBase
{
    private readonly IMediator mediator = mediator;

    // GET: api/<FriendController>
    [HttpGet]
    public async Task<IEnumerable<MessageUser>> Get()
    {
        var userId = HttpContext.User.Claims.GetClaimByUserId().Value;

        var result = await mediator.Send(new GetFriendsRequest(userId));

        return result;
    }

    // GET api/<FriendController>/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "value";
    }

    //// POST api/<FriendController>
    //[HttpPost]
    //public void Post([FromBody] string value)
    //{
    //}

    //// PUT api/<FriendController>/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    //// DELETE api/<FriendController>/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
}
