using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using SocialNetwork.Post.Data.Models;
using Mediator;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.APIs;
using SocialNetwork.Post.Data.DTOs;
using SocialNetwork.Post.APIs.Posts;
using PostModel = SocialNetwork.Post.Data.Models.Post;

namespace SocialNetwork.Post.Controllers;

[ApiController]
[Route("[controller]")]
public class PostController(
    AppDBContext DbContext,
    IMediator Mediator
    ) : ControllerBase
{
    private AppDBContext context = DbContext;
    private IMediator mediator = Mediator;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var postList = await mediator.Send(new GetListPostRequest());
        return Ok(postList);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var result = await mediator.Send(new GetPostRequest(id));
        if (result != null)
            return Ok(result);

        return NotFound("Post with id " + id + " not found.");
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] PostDTO postDTO)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        //var user = HttpContext.User;
        //var id = user.Claims.FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier).Value;
        //if (id == null) return Unauthorized("Id not found");

        // Chuyển từ DTO sang Model
        PostModel newPost = new PostModel()
        { 
            Message = postDTO.Message,
            CreatedAt = postDTO.CreatedAt,
            Medias = new List<string>(),
            Reactions = new List<Reaction>(),
            Comments = new List<Comment>()
        };

        var result = await mediator.Send(new AddPostRequest(newPost));

        return Ok(result);
    }

    
}