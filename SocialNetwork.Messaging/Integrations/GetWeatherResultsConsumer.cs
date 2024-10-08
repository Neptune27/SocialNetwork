using MassTransit;
using Mediator;
using SocialNetwork.Messaging.APIs.WeatherForecasts;
using SocialNetwork.Messaging.Data;

namespace SocialNetwork.Messaging.Integrations;

public class GetWeatherResultsConsumer : IConsumer<GetWeatherForecast>
{
    private readonly IMediator mediator;

    public GetWeatherResultsConsumer(IMediator mediator)
    {
        this.mediator = mediator;
    }


    public async Task Consume(ConsumeContext<GetWeatherForecast> context)
    {
        var weather = await mediator.Send(WeatherForecastRequest.Instance);
        await context.RespondAsync(weather);
    }
}
