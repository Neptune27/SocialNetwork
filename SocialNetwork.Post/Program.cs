using MassTransit;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Integrations;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddDbContext<AppDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("Post"));
});

builder.Services.AddMediator();

builder.AddDefaultMassTransit(option =>
{
    option.AddConsumers(typeof(Program).Assembly);
});


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

builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerWithJwtAuth();

var app = builder.Build();

app.UseCors("AllowedOrigins");

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
