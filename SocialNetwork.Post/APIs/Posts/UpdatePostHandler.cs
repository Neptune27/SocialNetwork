using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Post.Data;
using PostModel = SocialNetwork.Post.Data.Models.Post;

namespace SocialNetwork.Post.APIs.Posts;

public class UpdatePostHandler (AppDBContext DBContext)
    : IRequestHandler<UpdatePostRequest, PostModel>
{
    private readonly AppDBContext context = DBContext;

    public async ValueTask<PostModel> Handle(UpdatePostRequest request, CancellationToken cancellationToken)
    {
        var post = request.Post;
        context.Posts.Attach(post);
        context.Posts.Update(post);
        await context.SaveChangesAsync();
        return post;
    }
}