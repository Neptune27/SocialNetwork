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

namespace SocialNetwork.Identity.Controllers;

[Route("[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ILogger<AccountController> _logger;
    private readonly ITokenService tokenService;
    private readonly SignInManager<AppUser> signInManager;

    public AccountController(UserManager<AppUser> userManager,
        ILogger<AccountController> logger,
        ITokenService tokenService,
        SignInManager<AppUser> signInManager

        )
    {
        _userManager = userManager;
        _logger = logger;
        this.tokenService = tokenService;
        this.signInManager = signInManager;
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userManager.Users.
            FirstOrDefaultAsync(it => it.UserName == loginDto.Username);

        if (user == null)
        {
            return Unauthorized("Invalid Username.");
        }

        var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded)
        {
            return Unauthorized("Username not found and/or password not correct");
        }


        var dto =
        new TokenResultDto(user.UserName, user.Email, await tokenService.CreateToken(user, Request.Host));
        var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(dto));


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

            var createdUser = await _userManager.CreateAsync(appUser, register.Password);

            if (!createdUser.Succeeded)
            {
                _logger.LogWarning("User {User} had not been created with errors: {Errors}",
                    register.UserName,
                    string.Join(",",
                                createdUser.Errors.Select(it => it.ToString())
                        )
                    );

                return StatusCode(500, createdUser.Errors);
            }

            var roleResult = await _userManager.AddToRoleAsync(appUser, "User");

            if (!roleResult.Succeeded)
            {

                _logger.LogWarning("Role for User {User} had not been created with errors: {Errors}",
                    register.UserName,
                    string.Join(",",
                                roleResult.Errors.Select(it => it.ToString())
                        )
                    );

                return StatusCode(500, roleResult.Errors);
            }


            return Ok(new TokenResultDto(register.UserName, register.Email, await tokenService.CreateToken(appUser, Request.Host)));

        }
        catch (Exception e)
        {
            _logger.LogError("Register Error: {e}", e.Message);
            return StatusCode(500, e);
        }
    }
}
