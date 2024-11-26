using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Enums;
using SocialNetwork.Core.Models;
using SocialNetwork.Post.Data;
using System.Threading;
using System.Threading.Tasks;
using PostModel = SocialNetwork.Post.Data.Models.Post;

namespace SocialNetwork.Post.APIs.Posts;

public class GetProfileListPostHandler
    (AppDBContext DBContext)
    : IRequestHandler<GetProfileListPostRequest, List<PostModel>>
{
    private readonly AppDBContext context = DBContext;

    public async ValueTask<List<PostModel>> Handle(GetProfileListPostRequest request, CancellationToken cancellationToken)
    {


        var postList = await context.Posts
            .Include(p => p.User)
            .Include(p => p.Reactions)
            .Include(P => P.Comments
                .OrderByDescending(c => c.CreatedAt))
            .ThenInclude(c => c.User)
            .Where(p => p.Visibility == EVisibility.PUBLIC && p.User.Id == request.UserId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
        return postList;
    }
}
