using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Identity.APIs.Notifications;
using System.Security.Claims;

namespace SocialNetwork.Identity.Controllers;

[Route("[controller]")]
[Authorize]
[ApiController]
public class NotificationController(
    ILogger<NotificationController> logger,
    IMediator mediator
    ) : Controller
{
    private readonly ILogger<NotificationController> logger = logger;
    private readonly IMediator mediator = mediator;

    [HttpGet("Send")]
    public IActionResult Index()
    {
        var user = HttpContext.User;
        var id = user.Claims.GetClaimByUserId();
        var res = mediator.Send(new HelloRequest(id.Value));
        return Ok(res);
    }
}
