using Migration.Messaging;
using SocialNetwork.Messaging.Data;


var builder = Host.CreateApplicationBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddHostedService<Worker>();

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing.AddSource(Worker.ActivitySourceName));

builder.AddSqlServerDbContext<AppDBContext>("Messaging");

var host = builder.Build();
host.Run();
