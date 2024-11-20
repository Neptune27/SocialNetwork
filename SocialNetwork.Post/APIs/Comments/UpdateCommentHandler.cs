using Mediator;
using SocialNetwork.Post.APIs.Posts;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Comments
{
    public class UpdateCommentHandler(AppDBContext context)
        : IRequestHandler<UpdateCommentRequest, Comment>
    {
        private readonly AppDBContext context;

        public async ValueTask<Comment> Handle(UpdateCommentRequest request, CancellationToken cancellationToken)
        {
            var c = request.comment;
            context.Comments.Attach(c);
            var result = context.Comments.Update(c);
            await context.SaveChangesAsync();

            return result.Entity;
        }
    }
}
