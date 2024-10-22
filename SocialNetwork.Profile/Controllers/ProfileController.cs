using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Profile.APIs.Profiles;
using SocialNetwork.Profile.Data.DTOs;
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
		userDto.Friends = userDto.Friends.Take(9).ToList();

		var profile = new ProfileDTO()
		{
			IsVisitor = profileId == userId ? false : true,
			User = userDto
		};

		return Ok(profile);
	}

	[HttpGet("api/{profileId}/{userId}")]
	public async Task<IActionResult> TestGet(string profileId,string userId)
	{

		var user = await mediator.Send(new GetProfileRequest(profileId, userId));

		if (user == null)
		{
			return BadRequest("UserId not found");
		}

		var userDto = (User)user.Clone();
		userDto.Friends = userDto.Friends.Take(9).ToList();

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

	// DELETE api/<ProfileController>/5
	[HttpDelete("{id}")]
	public void Delete(int id)
	{
	}
}
