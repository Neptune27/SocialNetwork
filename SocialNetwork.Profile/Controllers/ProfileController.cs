using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Core.Helpers;
using SocialNetwork.Profile.APIs.Profiles;
using SocialNetwork.Profile.Data.DTOs;
using SocialNetwork.Profile.Data.DTOs.Profiles;
using SocialNetwork.Profile.Data.Models;
using System;
using System.Text.RegularExpressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialNetwork.Profile.Controllers;

[Authorize]
[Route("[controller]")]
[ApiController]
public class ProfileController(
	IMediator mediator
	) : ControllerBase
{
	private readonly IMediator mediator = mediator;

	// GET: api/<ProfileController>
	[HttpGet]
	public IEnumerable<string> Get()
	{
		return new string[] { "value1", "value2" };
	}

	// GET api/<ProfileController>/5
	[HttpGet("{profileId}")]
	public async Task<IActionResult> Get(string profileId)
	{
		string userId = HttpContext.User.Claims.GetClaimByUserId().Value;

		var user = await mediator.Send(new GetProfileRequest(profileId, userId));

        if (user == null)
        {
			return BadRequest("UserId not found");
        }

        var userDto = (User) user.Clone();

		var profile = new ProfileDTO()
		{
			IsVisitor = profileId == userId ? false : true,
			User = userDto
		};

		return Ok(profile);
	}

	[HttpGet("Name/{name}")]
    public async Task<IActionResult> GetByName(string name)
    {
        string userId = HttpContext.User.Claims.GetClaimByUserId().Value;

        var user = await mediator.Send(new GetProfileByNameRequest(name));

        if (user == null)
        {
            return BadRequest("UserId not found");
        }

        //var userDto = (User)user.Clone();

        //var profile = new ProfileDTO()
        //{
        //    IsVisitor = profileId == userId ? false : true,
        //    User = userDto
        //};

        return Ok(user);
    }


    // POST api/<ProfileController>
    [HttpPost]
	public void Post([FromBody] string value)
	{
	}

	// PUT api/<ProfileController>/5
	[HttpPut("{id}")]
	public void Put(int id, [FromBody] string value)
	{

	}
	[HttpPut("ProfilePicture")]
	[RequestSizeLimit(10L * 1024L * 1024L * 1024L)]
	[RequestFormLimits(MultipartBodyLengthLimit = 10L * 1024L * 1024L * 1024L)]
	[DisableFormValueModelBinding]
	public async Task<IActionResult> UpdateProfilePicture()
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

				await mediator.Send(new UpdateProfilePictureRequest(userId, fileName));

				return Ok("Upload finish");
			}

			section = await reader.ReadNextSectionAsync();
		}

		// If the code runs to this location, it means that no files have been saved
		return BadRequest("No files data in the request.");
		return Ok("Update Profile Picture Finish");
	}


	[HttpPut("Background")]
	[RequestSizeLimit(10L * 1024L * 1024L * 1024L)]
	[RequestFormLimits(MultipartBodyLengthLimit = 10L * 1024L * 1024L * 1024L)]
	[DisableFormValueModelBinding]
	public async Task<IActionResult> UpdateBackgroundPicture()
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

				await mediator.Send(new UpdateBackgroundRequest(userId, fileName));

				return Ok("Upload finish");
			}

			section = await reader.ReadNextSectionAsync();
		}

		// If the code runs to this location, it means that no files have been saved
		return BadRequest("No files data in the request.");
		return Ok("Update Profile Picture Finish");
	}


	[HttpPut("BirthDay")]
	public async Task<IActionResult> UpdateBirthDay([FromBody] DateOnly birthday )
	{
		string userId = HttpContext.User.Claims.GetClaimByUserId().Value;
		var user = await mediator.Send(new UpdateBirthdayRequest(birthday, userId));

		if(user == false)
		{
			return BadRequest("User not found");
		}
		return Ok(user);

	}

	[HttpPut("Name")]
	public async Task<IActionResult> UpdateName([FromBody] ProfileNameDTO dto)
	{
		string userId = HttpContext.User.Claims.GetClaimByUserId().Value;
		var user = await mediator.Send(new UpdateFirstLastNameRequest(dto, userId));

		if (user == false)
		{
			return BadRequest("User not found");
		}
		return Ok(user);

	}
	[HttpPut("FirstName")]
	public async Task<IActionResult> UpdateFirstName([FromBody] String firstName)
	{
		string userId = HttpContext.User.Claims.GetClaimByUserId().Value;
		var updateFirstNameSuccess = await mediator.Send(new UpdateFirstNameRequest(userId, firstName));

		if (!updateFirstNameSuccess)
		{
			return BadRequest("Update Fail");
		}
		return Ok("Update Finish");
		//return Ok(firstName);
	}

	[HttpPut("LastName")]
	public async Task<IActionResult> UpdateLastName([FromBody] String lastName)
	{
		string userId = HttpContext.User.Claims.GetClaimByUserId().Value;
		var updateLastNameSuccess = await mediator.Send(new UpdateLastNameRequest(userId, lastName));

		if (!updateLastNameSuccess)
		{
			return BadRequest("Update Fail");
		}
		return Ok("Update Finish");
		//return Ok(lastName);
	}

	[HttpPut("Location")]
	public async Task<IActionResult> UpdateLocation([FromBody] String location)
	{
		string userId = HttpContext.User.Claims.GetClaimByUserId().Value;
		var updateLocationSuccess = await mediator.Send(new UpdateLocationRequest(userId, location));

		if (!updateLocationSuccess)
		{
			return BadRequest("Update Fail");
		}
		return Ok("Update Finish");
	}

	[HttpPut("Instagram")]
	public async Task<IActionResult> UpdateInstagram([FromBody] string instagram)
	{
		string userId = HttpContext.User.Claims.GetClaimByUserId().Value;
		

		bool isValidUrl = Uri.TryCreate(instagram, UriKind.Absolute, out Uri uriResult)
					  && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);

		if (!isValidUrl)
		{
			return BadRequest("Invalid Instagram URL");
		}
		var updateInstagramSuccess = await mediator.Send(new UpdateInstagramRequest(userId, instagram));

		if (!updateInstagramSuccess)
		{
			return BadRequest("Update Fail");
		}
		return Ok("Update Finish");
	}

	[HttpPut("Twitter")]
	public async Task<IActionResult> UpdateTwitter([FromBody] String twitter)
	{
		string userId = HttpContext.User.Claims.GetClaimByUserId().Value;
		var updateInstagramSuccess = await mediator.Send(new UpdateTwitterRequest(userId, twitter));

		if (!updateInstagramSuccess)
		{
			return BadRequest("Update Fail");
		}
		return Ok("Update Finish");
	}

	[HttpPut("Github")]
	public async Task<IActionResult> UpdateGithub([FromBody] String github)
	{
		string userId = HttpContext.User.Claims.GetClaimByUserId().Value;
		var updateGithubSuccess = await mediator.Send(new UpdateGithubRequest(userId, github));

		if (!updateGithubSuccess)
		{
			return BadRequest("Update Fail");
		}
		return Ok("Update Finish");
	}




	// DELETE api/<ProfileController>/5
	[HttpDelete("{id}")]
	public void Delete(int id)
	{
	}
}
