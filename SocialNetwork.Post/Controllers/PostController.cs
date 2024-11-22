using Mediator;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Core.Extensions;
using System.Security.Claims;
using SocialNetwork.Post.Data.Models;
using SocialNetwork.Post.Data.DTOs;
using SocialNetwork.Post.APIs.Posts;
using PostModel = SocialNetwork.Post.Data.Models.Post;
using Microsoft.AspNetCore.Authorization;
using SocialNetwork.Post.APIs.Accounts;
using SocialNetwork.Core.Enums;
using System.Threading;
using SocialNetwork.Profile.Data.Models;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialNetwork.Post.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class PostController(
    IMediator mediator
    ) : ControllerBase
{
    private readonly IMediator mediator = mediator;

    // GET: api/<PostController>
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = HttpContext.User.Claims.GetClaimByUserId().Value;
        var postList = await mediator.Send(new GetListPostRequest(userId));
        return Ok(postList);
    }

    // GET api/<PostController>/5
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var result = await mediator.Send(new GetPostRequest(id));
        if (result != null)
            return Ok(result);
      
        return NotFound("Post with id " + id + " not found.");
    }

    // POST api/<PostController>
    [HttpPost]
    public async Task<IActionResult> Post([FromForm] PostDTO postDTO, List<IFormFile> files)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var user = HttpContext.User;
        var userId = user.Claims.FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier).Value;

        var loginUser = await mediator.Send(new GetUserRequest(userId));
        List<string> medias = [];

        foreach (var file in files)
        {
            var fileName = file.FileName;
            var extension = Path.GetExtension(fileName);
            var newName = Guid.NewGuid().ToString();
            var filePath = Path.Combine("Media", userId, newName+extension);
            var saveLocation = Path.Combine("./wwwroot", filePath);
            var dir = Path.GetDirectoryName(saveLocation);
            Directory.CreateDirectory(dir);
            medias.Add(filePath);
            using (var stream = System.IO.File.Create(saveLocation))
            {
                await file.CopyToAsync(stream);
            };

        }

        // Chuyển từ DTO sang Model
        PostModel newPost = new()
        {
            User = loginUser,
            Message = postDTO.Message ?? "",
            CreatedAt = DateTime.Now,
            LastUpdated = DateTime.Now,
            Medias = medias,
            Reactions = [],
            Comments = [],
            Visibility = EVisibility.PUBLIC
        };

        var result = await mediator.Send(new AddPostRequest(newPost));

        return Ok();
    }

    [HttpPut("{postId}")]
    public async Task<IActionResult> Put([FromBody] UpdatePostDTO updatedPost, int postId)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var user = HttpContext.User;
        var userId = user.Claims.FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier).Value;
        if (userId == null) return Unauthorized("Id not found");

        var loginUser = await mediator.Send(new GetUserRequest(userId));

        var exsitedPost = await mediator.Send(new GetPostRequest(postId));
        if (exsitedPost == null)
            return NotFound("Post not found or deleted.");

        exsitedPost.LastUpdated = DateTime.Now;
        exsitedPost.Message = updatedPost.Message;
        var result = await mediator.Send(new UpdatePostRequest(exsitedPost));
        if (result != null) return Ok(result);
        else
            return BadRequest(result); 
    }

    // DELETE api/<PostController>/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = HttpContext.User;
        var userId = user.Claims.FirstOrDefault(it => it.Type == ClaimTypes.NameIdentifier).Value;
        if (userId == null)
            return Unauthorized("Id not found");

        var loginUser = await mediator.Send(new GetUserRequest(userId));


        var result = await mediator.Send(new DeletePostRequest(id, userId));

        if (result) // true
            return Ok(result);
        else
            return NotFound("Post with id " + id + " not found.");
    }
}
