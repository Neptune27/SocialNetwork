using MassTransit;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Integrations;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddMediator();

// Add services to the container.
builder.Services.AddDbContext<AppDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("Profile"));
});

builder.AddDefaultMassTransit(option =>
{
    option.AddConsumer<AddUserConsumer>();
});

builder.AddDefaultJWTConfig();

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


var fileServerOption = new FileServerOptions
{
};

fileServerOption.StaticFileOptions.ServeUnknownFileTypes = true;
fileServerOption.StaticFileOptions.DefaultContentType = "application/binary";

app.UseFileServer(fileServerOption);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
