using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Post.APIs.Accounts;
using SocialNetwork.Post.APIs.Comments;
using SocialNetwork.Post.APIs.Posts;
using SocialNetwork.Post.Data.DTOs;
using SocialNetwork.Post.Data.Models;
using SocialNetwork.Profile.Data.Models;
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
    public async Task<IActionResult> Post([FromForm] CommentDTO dto, IFormFile? file)
    {

        var user = HttpContext.User;
        var id = user.Claims.FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier).Value;
        List<string> medias = [];

        if (file is not null)
        {
            //Save file
            var fileName = file.FileName;
            var extension = Path.GetExtension(fileName);
            var newName = Guid.NewGuid().ToString();
            var filePath = Path.Combine("Media", dto.PostId.ToString(), newName + extension);
            var saveLocation = Path.Combine("./wwwroot", filePath);
            var dir = Path.GetDirectoryName(saveLocation);
            Directory.CreateDirectory(dir);
            using (var stream = System.IO.File.Create(saveLocation))
            {
                await file.CopyToAsync(stream);
            };

            medias.Add(filePath);
        }
       


        var loginUser = await mediator.Send(new GetUserRequest(id));

        var postHost = await mediator.Send(new GetPostRequest(dto.PostId));
        if (postHost == null)
            return NotFound("Post with id " + dto.PostId + " not found");       
        Comment comment = new()
        {
            Post = postHost,
            User = loginUser,
            Message = dto.Message,
            CreatedAt = DateTime.Now,
            LastUpdated = DateTime.Now,
            Medias = medias,
        };

        var result = await mediator.Send(new AddCommentRequest(comment));
        if (result) return Ok(result);
        else return BadRequest(result);
    }

    [HttpPut("{commentId}")]
    public async Task<IActionResult> Put([FromBody] UpdateCommentDTO dto, int commentId)
    {
        var user = HttpContext.User;
        var id = user.Claims.FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier).Value;
        if (id == null)
            return Unauthorized("Id not found");

        var loginUser = await mediator.Send(new GetUserRequest(id));

        var comment = await mediator.Send(new GetCommentRequest(commentId));
        if (comment == null)
            return NotFound("Commnet with id " + commentId + " notfound");

        comment.Message = dto.Message;
        comment.LastUpdated = DateTime.Now;

        var result = await mediator.Send(new UpdateCommentRequest(comment));

        return Ok(result);
    }

    [HttpDelete("{commentId}")]
    public async Task<IActionResult> Delete(int commentId)
    {
        var user = HttpContext.User;
        var id = user.Claims.FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier).Value;
        if (id == null)
            return Unauthorized("Id not found");

        var loginUser = await mediator.Send(new GetUserRequest(id));
        var userId = loginUser.Id;
        var result = await mediator.Send(new DeleteCommentRequest(commentId, userId));

        if (result != null)
            return Ok(result);
        else
            return NotFound("Comment with id " + commentId + " not found.");
    }
}
