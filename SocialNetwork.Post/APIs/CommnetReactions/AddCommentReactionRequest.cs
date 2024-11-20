using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.CommnetReactions;

public class AddCommentReactionRequest(CommentReaction commentReaction) : IRequest<CommentReaction>
{
    public CommentReaction CommentReaction { get; } = commentReaction;
}
