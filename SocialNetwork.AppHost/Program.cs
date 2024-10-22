using Aspire.Hosting;

var builder = DistributedApplication.CreateBuilder(args);


var password = builder.AddParameter("Password", secret: true);


//DB
var sql = builder.AddSqlServer("SocialNetwork-Db", password, 1433);

    sql.WithVolume("SocialNetwork.sqldata", "/var/opt/mssql")
        .WithHealthCheck();
var sqldbIdentity = sql.AddDatabase("Identity").WaitFor(sql);
var sqldbNotification = sql.AddDatabase("Notification").WaitFor(sql);
var sqldbProfile = sql.AddDatabase("Profile").WaitFor(sql);
var sqldbPost = sql.AddDatabase("Post").WaitFor(sql);
var sqldbMessaging = sql.AddDatabase("Messaging").WaitFor(sql);
//var sqldb = sql.AddDatabase("SocialNetwork");


//Cache
var cache = builder.AddValkey("cache");
var broker = builder.AddRabbitMQ("broker")
    .WithImage("rabbitmq", "management-alpine")
    .WithEndpoint(name: "management", scheme: "http", targetPort: 15672);

var identityMigration = builder.AddProject<Projects.Migration_Identity>("migration-identity")
    .WithReference(sqldbIdentity).WaitFor(sqldbIdentity);

var notificationMigration = builder.AddProject<Projects.Migration_Notification>("migration-notification")
    .WithReference(sqldbNotification).WaitFor(sqldbNotification);

var postMigration = builder.AddProject<Projects.Migration_Post>("migration-post")
    .WithReference(sqldbPost).WaitFor(sqldbPost);


var profileMigration = builder.AddProject<Projects.Migration_Profile>("migration-profile")
    .WithReference(sqldbProfile).WaitFor(sqldbProfile);

var messageMigration = builder.AddProject<Projects.Migration_Messaging>("migration-messaging")
    .WithReference(sqldbMessaging).WaitFor(sqldbMessaging);


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
    .WithReference(frontend)
    .WithReference(broker)
    ;





builder.Build().Run();
