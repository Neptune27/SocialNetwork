using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Core.Models;
using SocialNetwork.Post.APIs.Accounts;
using SocialNetwork.Post.APIs.Comments;
using SocialNetwork.Post.APIs.CommnetReactions;
using SocialNetwork.Post.Data.DTOs.CommentReactions;
using SocialNetwork.Post.Data.Models;
using System.Security.Claims;

namespace SocialNetwork.Post.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class CommentReactionController(IMediator mediator) : ControllerBase
{
    private readonly IMediator mediator = mediator;

    [HttpGet("{commentId}")]
    public async Task<IActionResult> Get(int commentId)
    {
        BasicUser loginUser = await GetAuthorizeAsync();
        if (loginUser == null) return Unauthorized("No authorized.");

        var result = await mediator.Send(new GetCommentReactionRequest(commentId, loginUser.Id));
        if (result != null)
            return Ok(result);
        return BadRequest("Result not found.");
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CommentReactionDTO dto)
    {
        BasicUser loginUser = await GetAuthorizeAsync();
        if (loginUser == null) return Unauthorized("No authorized.");

        Comment comment = await mediator.Send(new GetCommentRequest(dto.CommentId));
        if (comment == null)
            return NotFound("Comment with id " + dto.CommentId + " not found.");

        CommentReaction commentReaction = new CommentReaction()
        {
            CommentId = dto.CommentId,
            UserId = loginUser.Id,
            Comment = comment,
            User = loginUser,
            CreatedAt = DateTime.Now,
            LastUpdated = DateTime.Now,
            Visibility = Core.Enums.EVisibility.PUBLIC
        };

        var result = await mediator.Send(new AddCommentReactionRequest(commentReaction));

        if (result != null)
            return Ok(result);
        return BadRequest(result);
    }

    [HttpPut("{commentId}")]
    public async Task<IActionResult> Put(int commentId)
    {
        BasicUser loginUser = await GetAuthorizeAsync();
        if (loginUser == null) return Unauthorized("No authorized.");

        Comment comment = await mediator.Send(new GetCommentRequest(commentId));
        if (comment == null) return NotFound("Comment with " + commentId + " not found.");

        CommentReaction commentReaction = await mediator.Send(new GetCommentReactionRequest(commentId, loginUser.Id));
        commentReaction.LastUpdated = DateTime.Now;
        return Ok();
    }

    [HttpDelete("{commentId}")]
    public async Task<IActionResult> Put(int commentId)
    {
        BasicUser loginUser = await GetAuthorizeAsync();
        if (loginUser == null) return Unauthorized("No authorized.");

        Comment comment = await mediator.Send(new GetCommentRequest(commentId));
        if (comment == null) return NotFound("Comment with " + commentId + " not found.");

        var result = await mediator.Send(new DeleteCommentReactionRequest(commentId, loginUser.Id));
        if (result != null)
            return Ok(result);
        else
            return BadRequest("Something wong >.<' ");
    }
    

    private async Task<BasicUser> GetAuthorizeAsync()
    {
        var user = HttpContext.User;
        var userId = user.Claims.FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier).Value;
        if (userId == null)
            return null;

        BasicUser loginUser = await mediator.Send(new GetUserRequest(userId));
        return loginUser;
    }
}
