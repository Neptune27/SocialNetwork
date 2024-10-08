using Mediator;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Notifications.APIs;

namespace SocialNetwork.Notifications.Controllers;

[Route("/")]
[ApiController]
public class HomeController(
    IMediator _mediator
    ) : Controller
{
    private readonly IMediator mediator = _mediator;

    [HttpGet("")]
    public async Task<IActionResult> GetNotification(int total = 10)
    {
        //TODO: Make this functional
        var userId = HttpContext.User.Identities;
        var result = await mediator.Send(new GetNotificationRequest("1", total));

        return Ok(result);
    }

}
