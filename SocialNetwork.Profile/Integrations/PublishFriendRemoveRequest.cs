using Mediator;

namespace SocialNetwork.Profile.Integrations;

public class PublishFriendRemoveRequest(string toUser, string fromUser) : IRequest<bool>
{
    public string ToUser { get; } = toUser;
    public string FromUser { get; } = fromUser;
}