using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Notifications.APIs;

namespace SocialNetwork.Notifications.Controllers;

[Route("/")]
[ApiController]
[Authorize]
public class HomeController(
    IMediator _mediator
    ) : Controller
{
    private readonly IMediator mediator = _mediator;

    [HttpGet("")]
    public async Task<IActionResult> GetNotification(int total = 10)
    {
    //TODO: Make this functional

        var userId = HttpContext.User.Claims.GetClaimByUserId().Value;
        var result = await mediator.Send(new GetNotificationRequest(userId, total));

        return Ok(result);
    }

    [HttpGet("Read")]
    public async Task<IActionResult> Read()
    {
        var userId = HttpContext.User.Claims.GetClaimByUserId().Value;
        var result = await mediator.Send(new UpdateReadRequest(userId));
        return Ok(result);

    }

}
