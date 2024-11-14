using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.CommnetReactions;

public class DeleteCommentReactionHandler(AppDBContext context)
    : IRequestHandler<DeleteCommentReactionRequest, CommentReaction>
{
    private readonly AppDBContext context = context;

    public async ValueTask<CommentReaction> Handle(DeleteCommentReactionRequest request, CancellationToken cancellationToken)
    {
        var commentReaction = await context.CommentReactions
            .FirstOrDefaultAsync(cre => cre.CommentId == request.CommentId
                                && cre.UserId == request.UserId
                                , cancellationToken);

        context.Attach(commentReaction);
        commentReaction.Visibility = Core.Enums.EVisibility.HIDDEN;
        var result = context.CommentReactions.Update(commentReaction);
        await context.SaveChangesAsync();
        return result.Entity;
    }
}