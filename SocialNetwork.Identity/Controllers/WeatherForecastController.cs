using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Identity.APIs.WeatherForecasts;

namespace SocialNetwork.Identity.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "User")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IMediator _mediator;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> Weather()
    {

        var weather = await _mediator.Send(WeatherForecastRequest.Instance);
        return Ok(weather
        );
    }
}
