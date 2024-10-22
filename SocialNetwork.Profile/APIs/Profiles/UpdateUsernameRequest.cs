using Mediator;

namespace SocialNetwork.Profile.APIs.Profiles;

public class UpdateUsernameRequest(
    string userId,
    string userName
    ) : IRequest<bool>
{
    public string UserId { get; } = userId;
    public string UserName { get; } = userName;
}