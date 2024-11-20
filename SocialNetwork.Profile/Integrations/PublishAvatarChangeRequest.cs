using Mediator;

namespace SocialNetwork.Profile.Integrations;

public class PublishAvatarChangeRequest(string userId, string profileUrl) : IRequest<bool>
{
    public string UserId { get; } = userId;
    public string ProfileUrl { get; } = profileUrl;
}