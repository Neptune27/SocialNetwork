using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Comments;

public class DeleteCommentHandler(AppDBContext context)
    : IRequestHandler<DeleteCommentRequest, Comment>
{
    private readonly AppDBContext context = context;

    public async ValueTask<Comment> Handle(DeleteCommentRequest request, CancellationToken cancellationToken)
    {
        var comment = await context.Comments.FirstOrDefaultAsync(c => c.Id == request.CommentId && c.User.Id == request.UserId);
        if (comment == null)
        {
            return null;
        }
        comment.Visibility = Core.Enums.EVisibility.HIDDEN;
        await context.SaveChangesAsync(cancellationToken);
        return comment;

    }
}