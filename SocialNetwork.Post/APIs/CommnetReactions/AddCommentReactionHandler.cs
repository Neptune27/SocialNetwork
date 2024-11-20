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
        await context.SaveChangesAsync();
        return commentReaction.Entity;
    }
}
