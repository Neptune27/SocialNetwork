using FluentValidation;
using SocialNetwork.Identity.APIs.Accounts;

namespace SocialNetwork.Identity.Validations;

public class AddAccountHandlerValidation : AbstractValidator<GetAccountRequest>
{
    public AddAccountHandlerValidation()
    {
    }
}
