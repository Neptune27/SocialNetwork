using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.CommnetReactions;

public class GetCommentReactionRequest(int commentId, string userId) : IRequest<CommentReaction>
{
    public int CommentId { get; } = commentId;
    public string UserId { get; } = userId;
}
