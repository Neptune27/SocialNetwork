using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Enums;
using SocialNetwork.Post.Data;
using PostModel = SocialNetwork.Post.Data.Models.Post;

namespace SocialNetwork.Post.APIs.Posts
{
    public class GetPostHandler(
        AppDBContext DBContext)
        : IRequestHandler<GetPostRequest, PostModel>
    {
        private readonly AppDBContext context = DBContext;

        public async ValueTask<PostModel> Handle(GetPostRequest request, CancellationToken cancellationToken)
        {
            var post = await context.Posts
                .Include(p => p.User)
                .Include(p => p.Reactions)
                .Include(P => P.Comments)
                .FirstOrDefaultAsync(p => p.Id == request.PostID && p.Visibility == EVisibility.PUBLIC, cancellationToken);
            return post;
        }
    }
}
