using Mediator;
using SocialNetwork.Messaging.Data;

namespace SocialNetwork.Identity.APIs.WeatherForecasts;

public record WeatherForecastRequest : IRequest<IEnumerable<WeatherForecast>>
{
    public static WeatherForecastRequest Instance { get; } = new();

    private WeatherForecastRequest() { }
}