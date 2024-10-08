using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Core.Extensions;

public static class JWTConfigExtensions
{
    public static IHostApplicationBuilder AddDefaultJWTConfig(this IHostApplicationBuilder builder, Action<JwtBearerOptions> action)
    {
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultScheme =
            options.DefaultChallengeScheme =
            options.DefaultForbidScheme =
            options.DefaultAuthenticateScheme =
            options.DefaultSignInScheme =
            options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
        })
           .AddJwtBearer(options =>
           {
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuer = true,
                   ValidIssuer = builder.Configuration["JWT:Issuer"],
                   ValidateAudience = true,
                   ValidAudiences = builder.Configuration.GetSection("JWT:Audiences").Get<List<string>>(),

                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(
                       System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
                   )

               };

               action.Invoke(options);

           });


        return builder;
    }


    public static IHostApplicationBuilder AddDefaultJWTConfig(this IHostApplicationBuilder builder)
    {
        return AddDefaultJWTConfig(builder, option => { });
    }
}
