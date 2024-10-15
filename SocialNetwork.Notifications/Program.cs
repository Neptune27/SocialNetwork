using MassTransit;
using MassTransit.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Notifications.Data;
using SocialNetwork.Notifications.Hubs;
using SocialNetwork.Notifications.Integrations;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddDbContext<AppDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("Notification"));
});

// Add services to the container.

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
                (path.StartsWithSegments("/hub")))
            {
                // Read the token out of the query string
                context.Token = accessToken;
            }
            return Task.CompletedTask;
        }
    };
});

builder.AddDefaultMassTransit(option =>
{
    //option.AddConsumer<GetWeatherResultsConsumer>();
    option.AddConsumers(typeof(Program).Assembly);
    option.AddSignalRHub<NotificationHub>();
});

builder.Services.AddMediator();




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

builder.Services.AddSignalR();




builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerWithJwtAuth();

var app = builder.Build();




app.MapDefaultEndpoints();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();


app.UseCors("AllowedOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHub<NotificationHub>("/hub");


app.Run();
