using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Post.APIs.Accounts;
using SocialNetwork.Post.APIs.Comments;
using SocialNetwork.Post.APIs.Posts;
using SocialNetwork.Post.Data.DTOs;
using SocialNetwork.Post.Data.Models;
using System.Security.Claims;

namespace SocialNetwork.Post.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class CommentController(IMediator mediator)
    : ControllerBase
{
    private readonly IMediator mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var commentList = await mediator.Send(new GetListCommentRequest());
        return Ok(commentList);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var comment = await mediator.Send(new GetCommentRequest(id));
        if (comment != null)
            return Ok(comment);
        else
            return NotFound("Comment with id " + id + " not found.");
    }

    [HttpPost]
    public async Task<IActionResult> Post(CommentDTO dto)
    {

        var user = HttpContext.User;
        var id = user.Claims.FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier).Value;
        if (id == null) 
            return Unauthorized("Id not found");

        var loginUser = await mediator.Send(new GetUserRequest(id));

        var postHost = await mediator.Send(new GetPostRequest(dto.PostId));
        if (postHost == null)
            return NotFound("Post with id " + dto.PostId + " not found");       
        Comment comment = new Comment()
        {
            Post = postHost,
            User = loginUser,
            Message = dto.Message,
        };

        var result = await mediator.Send(new AddCommentRequest(comment));
        if (result) return Ok(result);
        else return BadRequest(result);
    }
}
