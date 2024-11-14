using Mediator;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.CommnetReactions;

public class AddCommentReactionHandler(AppDBContext context)
    : IRequestHandler<AddCommentReactionRequest, CommentReaction>
{
    private readonly AppDBContext context;

    public async ValueTask<CommentReaction> Handle(AddCommentReactionRequest request, CancellationToken cancellationToken)
    {
        var commentReaction = await context.CommentReactions.AddAsync(request.CommentReaction, cancellationToken);
        var comment = await context.Comments.FindAsync(request.CommentReaction.CommentId);
        context.Attach(comment);
        comment.Reactions.Add(commentReaction.Entity);
        context.Comments.Update(comment);
        await context.SaveChangesAsync();
        return commentReaction.Entity;

    }
}
