using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Core.Extensions;

public static class MassTransitExtensions
{
    public static IServiceCollection AddDefaultMassTransit(this IHostApplicationBuilder builder, Action<IBusRegistrationConfigurator> action)
    {
        return builder.Services.AddMassTransit(option =>
        {
            option.UsingRabbitMq((context, cfg) =>
            {
                cfg.Host(builder.GetAspireConnectionString("RabbitMQ:Client", "broker"));
                cfg.ConfigureEndpoints(context);
            });

            action.Invoke(option);
        });
    }
}
