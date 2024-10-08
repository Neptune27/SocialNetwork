using SocialNetwork.Migration;
using SocialNetwork.Identity.Data.Context;

//var builder = Host.CreateApplicationBuilder(args);

//builder.AddServiceDefaults();
//builder.Services.AddHostedService<Worker>();

//var host = builder.Build();
//host.Run();

//using SocialNetwork.Identity.Data.MigrationService;

var builder = Host.CreateApplicationBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddHostedService<Worker>();

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing.AddSource(Worker.ActivitySourceName));

builder.AddSqlServerDbContext<AppDBContext>("Identity");

var host = builder.Build();
host.Run();
