using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Profile.APIs.Profiles;
using SocialNetwork.Profile.Data.DTOs;
using SocialNetwork.Profile.Data.DTOs.Profiles;
using SocialNetwork.Profile.Data.Models;

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
	public async void UpdateProfilePicture([FromBody] IFormFile profilePicture)
	{
		//profilePicture.

		//string userId = HttpContext.User.Claims.GetClaimByUserId().Value;
		//var user = await mediator.Send(new UpdateProfilePictureRequest(userId, profilePicture));

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

	[HttpPut("SocialInformation")]
	public async Task<IActionResult> UpdateSocialInformation([FromBody] SocialInformationDTO dto)
	{
		string userId = HttpContext.User.Claims.GetClaimByUserId().Value;
		var user = await mediator.Send(new UpdateSocialInformationRequest(userId,dto));

		if (user == false)
		{
			return BadRequest("User not found");
		}
		return Ok(user);

	}


	// DELETE api/<ProfileController>/5
	[HttpDelete("{id}")]
	public void Delete(int id)
	{
	}
}
