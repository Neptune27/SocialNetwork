using Mediator;
using SocialNetwork.Identity.DTOs.Account;

namespace SocialNetwork.Identity.APIs.Accounts;

public class PublishAccountInternalRequest(
    RegisterDto data
    ) : IRequest<bool>
{
    public RegisterDto Data { get; } = data;
}
