using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MassTransit.Logging.DiagnosticHeaders;

namespace SocialNetwork.Core.Middlewares;

public sealed class ValidationExceptionHandlingMiddleware(RequestDelegate next)
{
    private readonly RequestDelegate _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException exception)
        {
            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Type = "ValidationFailure",
                Title = "Validation error",
                Detail = "One or more validation errors has occurred"
            };

            if (exception.Errors is not null)
            {
                if (exception.Message.Length != 0)
                {
                    var errors = exception.Errors.ToList();
                    errors.Add(new FluentValidation.Results.ValidationFailure()
                    {
                        ErrorMessage = exception.Message
                    });
                    problemDetails.Extensions["errors"] = errors;
                }
                else
                {
                    problemDetails.Extensions["errors"] = exception.Errors;
                }

            }

            context.Response.StatusCode = StatusCodes.Status400BadRequest;

            await context.Response.WriteAsJsonAsync(problemDetails);
        }
    }
}