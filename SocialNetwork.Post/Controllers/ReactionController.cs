using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Core.Models;
using SocialNetwork.Post.APIs.Accounts;
using SocialNetwork.Post.APIs.Posts;
using SocialNetwork.Post.APIs.Reactions;
using SocialNetwork.Post.Data.DTOs.Reactions;
using SocialNetwork.Post.Data.Models;
using System.Security.Claims;

namespace SocialNetwork.Post.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class ReactionController(IMediator mediator) : ControllerBase
{
    private readonly IMediator medidator = mediator;

    [HttpGet("{postId}")]
    public async Task<IActionResult> Get(int postId)
    {
        var loginUser = await GetAuthorizeAsync();
        if(loginUser == null) return Unauthorized("Not authorized.");

        var result = mediator.Send(new GetReactionRequest(loginUser.Id, postId));
        if (result != null)
            return Ok(result);
        else
            return NotFound("Not found");
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ReactionDTO dto)
    {
        var loginUser = await GetAuthorizeAsync();
        if (loginUser == null) return Unauthorized("Not authorized.");

        var post = await mediator.Send(new GetPostRequest(dto.PostID));
        if (post == null)
            return NotFound("Post with id + " + dto.PostID + " not found.");

        Reaction reaction = new Reaction()
        {
            UserId = loginUser.Id,
            PostId = post.Id,
            User = loginUser,
            Post = post,
            ReactionType = dto.ReactionType,
            CreatedAt = DateTime.Now,
            LastUpdated = DateTime.Now,
            Visibility = Core.Enums.EVisibility.PUBLIC
        };

        var result = await mediator.Send(new AddReactionRequest(reaction));

        if (result != null)
        {
            post.Reactions.Add(reaction);
            await mediator.Send(new UpdatePostRequest(post));
            return Ok(result);
        }
        else
            return BadRequest(result); 
    }

    [HttpPut("{postId}")]
    public async Task<IActionResult> Put([FromBody] ReactionDTO dto)
    {
        var loginUser = await GetAuthorizeAsync();
        if (loginUser == null) return Unauthorized("Not authorized.");

        var post = await mediator.Send(new GetPostRequest(dto.PostID));
        if (post == null)
            return NotFound("Post with id + " + dto.PostID + " not found.");

        Reaction existingReaction = await mediator.Send(new GetReactionRequest(loginUser.Id, dto.PostID));
        if (existingReaction == null) return Ok("Reaction not found");

        existingReaction.ReactionType = dto.ReactionType;
        existingReaction.LastUpdated = DateTime.Now;

        var result = await mediator.Send(new UpdateReactionRequest(existingReaction));
        return Ok(result);
    }

    [HttpDelete("{postId}")]
    public async Task<IActionResult> Delete(int postId)
    {
        var loginUser = await GetAuthorizeAsync();
        if (loginUser == null) return Unauthorized("Not authorized.");

        var post = await mediator.Send(new GetPostRequest(postId));
        if (post == null)
            return NotFound("Post with id + " + postId + " not found.");

        var result = await mediator.Send(new DeleteReactionRequest(postId, loginUser.Id));
        if(result != null)
        {
            //post.Reactions.Remove(reaction);
            return Ok(result);
        }
        return BadRequest(result);
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
