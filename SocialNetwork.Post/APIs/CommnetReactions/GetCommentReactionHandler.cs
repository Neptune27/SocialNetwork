using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.CommnetReactions;

public class GetCommentReactionHandler(AppDBContext context) 
    : IRequestHandler<GetCommentReactionRequest, CommentReaction>
{
    private readonly AppDBContext context;

    public async ValueTask<CommentReaction> Handle(GetCommentReactionRequest request, CancellationToken cancellationToken)
    {
        var result = await context.CommentReactions
            .FirstOrDefaultAsync(cmt => cmt.CommentId ==  request.CommentId && cmt.UserId == request.UserId);
        return result;
    }
}
