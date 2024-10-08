using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Core.Extensions;

public static class AspireBuilderExtensions
{
    public static string GetAspireConnectionString(this IHostApplicationBuilder builder, string section, string connectionName)
    {
        var sectionName = $"Aspire:{section}:{connectionName}";
        IConfigurationSection configSection = builder.Configuration.GetSection(sectionName);
        string connectionString = builder.Configuration.GetConnectionString(connectionName);

        return connectionString;

    }
}
