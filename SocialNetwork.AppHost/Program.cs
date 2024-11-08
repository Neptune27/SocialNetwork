using Aspire.Hosting;

var builder = DistributedApplication.CreateBuilder(args);


var password = builder.AddParameter("Password", secret: true);


//DB
var sql = builder.AddSqlServer("SocialNetwork-Db", password, 1433);
sql.WithVolume("SocialNetwork.sqldata", "/var/opt/mssql");
sql.WithLifetime(ContainerLifetime.Persistent);
var sqldbIdentity = sql.AddDatabase("Identity");
var sqldbNotification = sql.AddDatabase("Notification");
var sqldbProfile = sql.AddDatabase("Profile");
var sqldbPost = sql.AddDatabase("Post");
var sqldbMessaging = sql.AddDatabase("Messaging");
//var sqldb = sql.AddDatabase("SocialNetwork");


//Cache
var cache = builder.AddValkey("cache");
var broker = builder.AddRabbitMQ("broker")
    .WithImage("rabbitmq", "management-alpine")
    .WithEndpoint(name: "management", scheme: "http", targetPort: 15672);

var identityMigration = builder.AddProject<Projects.Migration_Identity>("migration-identity")
    .WithReference(sqldbIdentity).WaitFor(sql);

var notificationMigration = builder.AddProject<Projects.Migration_Notification>("migration-notification")
    .WithReference(sqldbNotification).WaitFor(sql);

var postMigration = builder.AddProject<Projects.Migration_Post>("migration-post")
    .WithReference(sqldbPost).WaitFor(sql);


var profileMigration = builder.AddProject<Projects.Migration_Profile>("migration-profile")
    .WithReference(sqldbProfile).WaitFor(sql);

var messageMigration = builder.AddProject<Projects.Migration_Messaging>("migration-messaging")
    .WithReference(sqldbMessaging).WaitFor(sql);


var identityService = builder.AddProject<Projects.SocialNetwork_Identity>("socialnetwork-identity")
    .WithReference(sqldbIdentity)
    .WithReference(broker)
    .WaitForCompletion(identityMigration);

var messagingService = builder
    .AddProject<Projects.SocialNetwork_Messaging>("socialnetwork-messaging")
    .WithReference(sqldbMessaging)
    .WithReference(broker)
    .WaitForCompletion(messageMigration)
    ;

var notificationService = builder
    .AddProject<Projects.SocialNetwork_Notifications>("socialnetwork-notifications")
    .WithReference(sqldbNotification)
    .WithReference(broker)
    .WaitForCompletion(notificationMigration)
    ;


var postService = builder.AddProject<Projects.SocialNetwork_Post>("socialnetwork-post")
    .WithReference(sqldbPost)
    .WithReference(broker)
    .WaitForCompletion(postMigration)

    ;

var profileService = builder.AddProject<Projects.SocialNetwork_Profile>("socialnetwork-profile")
    .WithReference(sqldbProfile)
    .WithReference(broker)
    .WaitForCompletion(profileMigration)
    ;

var frontend = builder.AddNpmApp("frontend", "../SocialNetwork.FrontEnd", "dev")
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(port: 3000, env: "PORT", isProxied: false)
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();


var apiGateway = builder.AddProject<Projects.SocialNetwork_Proxy>("socialnetwork-proxy")
    .WithHttpsEndpoint(8080, name: "proxy", isProxied: false)
    .WithReference(identityService)
    .WithReference(messagingService)
    .WithReference(notificationService)
    .WithReference(postService)
    .WithReference(profileService)
    .WithReference(frontend)
    .WithReference(broker)
    ;





builder.Build().Run();
