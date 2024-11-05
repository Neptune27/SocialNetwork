using MassTransit;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Extensions;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Integrations;

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
    option.AddConsumer<AddPostUserConsumer>();
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

builder.Services.AddControllers();
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



app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
