using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Posts;

public class GetListCommentHandler(AppDBContext DBContext)
    : IRequestHandler<GetListCommentRequest, List<Comment>>
{
    private readonly AppDBContext context = DBContext;


    public async ValueTask<List<Comment>> Handle(GetListCommentRequest request, CancellationToken cancellationToken)
    {
        var comment = await context.Comments.ToListAsync();
        return comment;
    }
}
