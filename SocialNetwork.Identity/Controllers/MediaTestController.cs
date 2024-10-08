using MediaProcessor;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using SocialNetwork.Identity.Helpers;
using System.IO;
using System.Net;

namespace SocialNetwork.Identity.Controllers;

[Route("[controller]")]
[ApiController]
public class MediaTestController : Controller
{
    [HttpPost("[action]")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
        if (file.Length <= 0)
        {
            return BadRequest();
        }

        var filePath = Path.GetTempFileName();

        var path = Path.Combine("./Media", filePath);
        using var stream = System.IO.File.Create(path);
        await file.CopyToAsync(stream);

        VideoConverter.Convert(path, "./Media/a.mp4");

        return Ok();
    }

    [HttpPost("[action]")]
    [RequestSizeLimit(10L * 1024L * 1024L * 1024L)]
    [RequestFormLimits(MultipartBodyLengthLimit = 10L * 1024L * 1024L * 1024L)]
    [DisableFormValueModelBinding]
    public async Task<IActionResult> UploadStream()
    {

        if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
        {
            ModelState.AddModelError("File",
                $"The request couldn't be processed (Error 1).");
            // Log error

            return BadRequest(ModelState);
        }

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
                // Don't trust any file name, file extension, and file data from the request unless you trust them completely
                // Otherwise, it is very likely to cause problems such as virus uploading, disk filling, etc
                // In short, it is necessary to restrict and verify the upload
                // Here, we just use the temporary folder and a random file name

                // Get the temporary folder, and combine a random file name with it
                var fileName = contentDisposition.FileName.ToString();
                var saveToPath = Path.Combine("./Media", fileName);

                using (var targetStream = System.IO.File.Create(saveToPath))
                {
                    await section.Body.CopyToAsync(targetStream);
                }

                VideoConverter.Convert(saveToPath, "./Media/a.mp4");



                return Ok();
            }

            section = await reader.ReadNextSectionAsync();
        }

        // If the code runs to this location, it means that no files have been saved
        return BadRequest("No files data in the request.");
    }
}

