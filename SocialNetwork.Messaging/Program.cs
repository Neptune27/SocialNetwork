using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SocialNetwork.Messaging.Hubs;
using MassTransit;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Messaging.APIs.WeatherForecasts;
using SocialNetwork.Messaging.Integrations;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

//Dependencies Injections
builder.AddServiceDefaults();

builder.Services.AddDbContext<AppDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("Messaging"));
});

builder.AddDefaultMassTransit(option => {
option.AddConsumers(typeof(Program).Assembly);
});

builder.Services.AddMediator();

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
}); ;


builder.AddDefaultJWTConfig(options =>
{
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {

            var accessToken = context.Request.Query["access_token"];

            // If the request is for our hub...
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(accessToken) &&
                (path.StartsWithSegments("/videohub")))
            {
                // Read the token out of the query string
                context.Token = accessToken;
            }
            return Task.CompletedTask;
        }
    };
});



List<string> allowedOrigins = builder.Configuration.GetSection("CORS:Origins").Get<List<string>>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowedOrigins",
        policy =>
        {
            policy.WithOrigins([.. allowedOrigins])
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
}
);


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerWithJwtAuth();

builder.Services.AddSignalR();




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowedOrigins");


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//Map SignalR message hub
app.MapHub<MessageHub>("/hub");
app.MapHub<VideoHub>("/videohub");

app.Run();
