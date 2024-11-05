using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Comments;
public class GetCommentHandler(AppDBContext DBContext)
    : IRequestHandler<GetCommentRequest, Comment>
{
    private readonly AppDBContext context = DBContext;

    public async ValueTask<Comment> Handle(GetCommentRequest request, CancellationToken cancellationToken)
    {
        var comment = await context.Comments.FirstOrDefaultAsync(c => c.Id == request.CommentId, cancellationToken);
        return comment;
    }
}