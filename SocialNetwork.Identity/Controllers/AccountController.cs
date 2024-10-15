using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Identity.DTOs.Account;
using SocialNetwork.Identity.Interfaces.Services;
using SocialNetwork.Identity.Data.Models;
using System.Text.Json;
using RabbitMQ.Client;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Text;
using Mediator;
using SocialNetwork.Identity.APIs.Accounts;
using MassTransit;

namespace SocialNetwork.Identity.Controllers;

[Route("[controller]")]
[ApiController]
public class AccountController(
    ILogger<AccountController> logger,
    SignInManager<AppUser> signInManager,
    IMediator mediator,
    IBus bus

        ) : ControllerBase
{
    private readonly ILogger<AccountController> _logger = logger;
    private readonly SignInManager<AppUser> signInManager = signInManager;
    private readonly IMediator mediator = mediator;
    private readonly IBus bus = bus;

    [HttpPost("[action]")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await mediator.Send(new GetAccountRequest(loginDto.Username));

        if (user == null)
        {
            return Unauthorized("Invalid Username.");
        }

        var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded)
        {
            return Unauthorized("Password is not correct");
        }


        var dto = mediator.Send(new CreateTokenRequest(user, Request.Host));
        
        //var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(dto));


        return Ok(dto);
    }


    [HttpPost("[action]")]
    public async Task<IActionResult> Register([FromBody] RegisterDto register)
    {

        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appUser = new AppUser { UserName = register.UserName, Email = register.Email };

            var createdUser = await mediator.Send(new AddAccountRequest(appUser, register.Password));

            if (!createdUser.Succeeded)
            {
                return StatusCode(500, createdUser.Errors);
            }

            var roleResult = await mediator.Send(new AddToRoleRequest(appUser, "User"));

            if (!roleResult.Succeeded)
            {
                return StatusCode(500, roleResult.Errors);
            }


            var token = await mediator.Send(new CreateTokenRequest(appUser, Request.Host));
            var publish = await mediator.Send(new PublishAccountInternalRequest(register));
            return Ok(token);

        }
        catch (Exception e)
        {
            _logger.LogError("Register Error: {e}", e.Message);
            return StatusCode(500, e);
        }
    }
}
