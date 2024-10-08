using MassTransit;
using Mediator;
using SocialNetwork.Messaging.Data;

namespace SocialNetwork.Messaging.APIs.WeatherForecasts;



public class WeatherForecastHandler : IRequestHandler<WeatherForecastRequest, WeatherReportList>
{
    private static readonly string[] Summaries = new[]
{
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastHandler> _logger;

    public WeatherForecastHandler(ILogger<WeatherForecastHandler> logger
        )
    {
        _logger = logger;
    }

    public ValueTask<WeatherReportList> Handle(WeatherForecastRequest request, CancellationToken cancellationToken)
    {
        var forecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast
        (
            Date: DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC: Random.Shared.Next(-20, 55),
            Summary: Summaries[Random.Shared.Next(Summaries.Length)]
        ));

        //var forecast = await requestClient.GetResponse()

        var res = new WeatherReportList(forecasts.ToList());

        return ValueTask.FromResult(res);
    }
}
