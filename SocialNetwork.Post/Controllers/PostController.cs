using Mediator;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Post.APIs.Posts;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialNetwork.Post.Controllers;

[Route("[controller]")]
[ApiController]
public class PostController(
    IMediator mediator
    ) : ControllerBase
{
    private readonly IMediator mediator = mediator;

    // GET: api/<PostController>
    [HttpGet]
    public IEnumerable<string> Get()
    {
        return new string[] { "value1", "value2" };
    }

    // GET api/<PostController>/5
    [HttpGet("{id}")]
    public string Get(string id)
    {
      

        return "value";
    }

    // POST api/<PostController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<PostController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<PostController>/5
    [HttpDelete("{id}")]
    public async void Delete(int id)
    {
        var user = HttpContext.User.Claims.GetClaimByUserId();
        var result = await mediator.Send(new DeletePostRequest(id,user.Value));

    }
}
