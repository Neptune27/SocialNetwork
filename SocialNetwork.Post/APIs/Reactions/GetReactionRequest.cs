using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Reactions;

public class GetReactionRequest(string userId, int postId) : IRequest<Reaction>
{
    public string UserId { get; } = userId;

    public int PostId { get; } = postId;
}
