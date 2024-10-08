using Mediator;
using SocialNetwork.Messaging.Data;

namespace SocialNetwork.Messaging.APIs.WeatherForecasts;

public record WeatherForecastRequest : IRequest<WeatherReportList>
{
    public static WeatherForecastRequest Instance { get; } = new();

    private WeatherForecastRequest() { }
}