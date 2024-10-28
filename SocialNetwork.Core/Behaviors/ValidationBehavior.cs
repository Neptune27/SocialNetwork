using FluentValidation;
using FluentValidation.Results;
using Mediator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SocialNetwork.Core.Behaviors;

public sealed class ValidationBehavior<TRequest, TResponse>(IEnumerable<IValidator<TRequest>> validators)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IMessage
{
    private readonly IEnumerable<IValidator<TRequest>> _validators = validators;

    public async ValueTask<TResponse> Handle(TRequest message, CancellationToken cancellationToken, MessageHandlerDelegate<TRequest, TResponse> next)
    {

        var context = new ValidationContext<TRequest>(message);

        var validationFailures = await Task.WhenAll(
            _validators.Select(validator => validator.ValidateAsync(context)));

        var errors = validationFailures
            .Where(validationResult => !validationResult.IsValid)
            .SelectMany(validationResult => validationResult.Errors)
            .Select(validationFailure => new ValidationFailure(
                validationFailure.PropertyName,
                validationFailure.ErrorMessage,
                validationFailure.AttemptedValue))
            .ToList();

        if (errors.Count != 0)
        {
            throw new ValidationException(errors);
        }

        var response = await next(message, cancellationToken);

        return response;
    }
}