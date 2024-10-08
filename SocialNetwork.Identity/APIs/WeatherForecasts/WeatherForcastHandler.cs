using MassTransit;
using Mediator;
using SocialNetwork.Messaging.Data;

namespace SocialNetwork.Identity.APIs.WeatherForecasts;

public class WeatherForecastHandler(
    ILogger<WeatherForecastHandler> logger,
    IRequestClient<GetWeatherForecast> requestClient)
    : IRequestHandler<WeatherForecastRequest, IEnumerable<WeatherForecast>>
{
    private static readonly string[] Summaries = {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastHandler> _logger = logger;

    public async ValueTask<IEnumerable<WeatherForecast>> Handle(WeatherForecastRequest request,
        CancellationToken cancellationToken)
    {
        var forecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast
        (
            Date: DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC: Random.Shared.Next(-20, 55),
            Summary: Summaries[Random.Shared.Next(Summaries.Length)]
        ));

        // return forecasts;

        var forecast = await requestClient.GetResponse<WeatherReportList>(new GetWeatherForecast());
        return forecast.Message.WeatherReportLists.AsEnumerable();
    }
}
