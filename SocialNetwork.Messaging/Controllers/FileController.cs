using MediaProcessor;
using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Core.Helpers;
using SocialNetwork.Messaging.APIs.Files;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialNetwork.Messaging.Controllers;

[Authorize]
[Route("[controller]")]
[ApiController]
public class FileController(IMediator mediator) : ControllerBase
{
    // GET: api/<FileController>
    //[HttpGet]
    //public IEnumerable<string> Get()
    //{
    //    return new string[] { "value1", "value2" };
    //}

    // GET api/<FileController>/5
    //[HttpGet("{id}")]
    //public string Get(int id)
    //{
    //    return "value";
    //}

    private List<string> imageExtension = ["png", "jpg", "webp", "jpeg", "heic"];
    private readonly IMediator mediator = mediator;

    // POST api/<FileController>
    [HttpPost]
    [RequestSizeLimit(10L * 1024L * 1024L * 1024L)]
    [RequestFormLimits(MultipartBodyLengthLimit = 10L * 1024L * 1024L * 1024L)]
    [DisableFormValueModelBinding]
    public async Task<IActionResult> PostStream()
    {
        if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
        {
            ModelState.AddModelError("File",
                $"The request couldn't be processed (Error 1).");
            // Log error

            return BadRequest(ModelState);
        }

        var userId = HttpContext.User.Claims.GetClaimByUserId().Value;


        var boundary = MultipartRequestHelper.GetBoundary(
            MediaTypeHeaderValue.Parse(Request.ContentType),
            int.MaxValue);
        var reader = new MultipartReader(boundary, HttpContext.Request.Body);
        var section = await reader.ReadNextSectionAsync();

        while (section != null)
        {
            var hasContentDispositionHeader = ContentDispositionHeaderValue.TryParse(section.ContentDisposition,
    out var contentDisposition);

            if (hasContentDispositionHeader && contentDisposition.DispositionType.Equals("form-data") &&
                !string.IsNullOrEmpty(contentDisposition.FileName.Value))
            {
                var fileName = contentDisposition.FileName.ToString();
                var saveToPath = Path.Combine("./StaticFiles/Media/", userId, fileName);
                var dir = Path.GetDirectoryName(saveToPath);
                Directory.CreateDirectory(dir);

                using (var targetStream = System.IO.File.Create(saveToPath))
                {
                    await section.Body.CopyToAsync(targetStream);
                }


                switch (FileHelpers.GetFileType(fileName))
                {
                    case EFileType.BIN:
                        await mediator.Send(new AddFileRequest(userId, fileName));
                        break;
                    case EFileType.IMAGE:
                        await mediator.Send(new AddImageRequest(userId, fileName));
                        break;
                    case EFileType.VIDEO:
                        //await mediator.Send(new AddVideoRequest(userId, fileName));
                        break;
                }



                //VideoConverter.Convert(saveToPath, "./Media/a.mp4");



                return Ok();
            }

            section = await reader.ReadNextSectionAsync();
        }

        // If the code runs to this location, it means that no files have been saved
        return BadRequest("No files data in the request.");
    }

    // PUT api/<FileController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<FileController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
