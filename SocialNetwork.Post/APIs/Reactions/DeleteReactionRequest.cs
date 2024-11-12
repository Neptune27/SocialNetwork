using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Reactions;

public class DeleteReactionRequest(int postId, string userId) : IRequest<Reaction>
{
    public int PostID { get; } = postId;
    public string UserId { get; } = userId;
}