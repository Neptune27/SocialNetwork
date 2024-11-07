using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Enums;
using SocialNetwork.Post.Data;
using System.Threading;
using System.Threading.Tasks;
using PostModel = SocialNetwork.Post.Data.Models.Post;

namespace SocialNetwork.Post.APIs.Posts;

public class GetListPostHandler
    (AppDBContext DBContext)
    : IRequestHandler<GetListPostRequest, List<PostModel>>
{
    private readonly AppDBContext context = DBContext;

    public async ValueTask<List<PostModel>> Handle(GetListPostRequest request, CancellationToken cancellationToken)
    {
        var postList = await context.Posts
            .Include(p => p.User)
            .Include(p => p.Reactions)
            .Include(P => P.Comments)
            .Where(p => p.Visibility == EVisibility.PUBLIC)
            .ToListAsync();
        return postList;
    }
}
