using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SocialNetwork.Identity.Data.Context;
using SocialNetwork.Identity.Interfaces.Services;
using SocialNetwork.Identity.Data.Models;
using IdentityDbContext = SocialNetwork.Identity.Data.Context;
using SocialNetwork.Identity.Services;
using MassTransit;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Identity.APIs.WeatherForecasts;
using SocialNetwork.Messaging.Data;
using SocialNetwork.Core.Middlewares;
using Mediator;
using SocialNetwork.Core.Behaviors;
using FluentValidation;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
//builder.AddSqlServerDbContext<AppDBContext>("sqldb");


builder.Services.AddDbContext<IdentityDbContext.AppDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("Identity"));
});

builder.Services.AddScoped<ITokenService, TokenService>();


builder.Services.AddMediator();
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly);

builder.Services.AddMassTransit(option =>
{
    option.AddRequestClient<WeatherForecast>();
    option.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.GetAspireConnectionString("RabbitMQ:Client", "broker"));
        cfg.ConfigureEndpoints(context);
    });
});


builder.Services.AddIdentity<AppUser, IdentityRole>(option =>
{
    option.Password.RequireDigit = true;
    option.Password.RequireLowercase = true;
    option.Password.RequireUppercase = true;
    option.Password.RequireNonAlphanumeric = true;
    option.Password.RequiredLength = 12;
    option.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<IdentityDbContext.AppDBContext>();

builder.AddDefaultJWTConfig();


List<string> allowedOrigins = builder.Configuration.GetSection("CORS:Origins").Get<List<string>>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowedOrigins",
        policy =>
        {
            policy.WithOrigins([.. allowedOrigins])
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
}
);




builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerWithJwtAuth();

var app = builder.Build();

app.UseMiddleware<ValidationExceptionHandlingMiddleware>();

app.UseCors("AllowedOrigins");

app.UseAuthentication();
app.UseAuthorization();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapControllers();

app.Run();
