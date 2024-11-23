using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Enums;
using SocialNetwork.Core.Models;
using SocialNetwork.Post.Data;
using System.Threading;
using System.Threading.Tasks;
using PostModel = SocialNetwork.Post.Data.Models.Post;

namespace SocialNetwork.Post.APIs.Posts;

public class GetListPostQueryHandler
    (AppDBContext DBContext)
    : IRequestHandler<GetListPostQueryRequest, List<PostModel>>
{
    private readonly AppDBContext context = DBContext;

    public async ValueTask<List<PostModel>> Handle(GetListPostQueryRequest request, CancellationToken cancellationToken)
    {

        var userFriend = await context.Friends
            .Where(f => f.UserFromId == request.UserId || f.UserToId == request.UserId)
            .Select(f => f.UserFromId == request.UserId ? f.UserTo : f.UserFrom).ToListAsync();
        var postList = await context.Posts
            .Include(p => p.User)
            .Include(p => p.Reactions)
            .Include(P => P.Comments)
            .Where(p => p.Visibility == EVisibility.PUBLIC 
                    && p.Message.ToLower().Contains(request.Query.ToLower()))
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
        return postList.Where(p => p.User.Id == request.UserId
                    || userFriend.Any(u => u.Id == p.User.Id)).ToList();
    }
}
