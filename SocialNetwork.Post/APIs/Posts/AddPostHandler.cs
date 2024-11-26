using Mediator;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Posts;
public class AddPostHandler(
    AppDBContext DBContext
    ) : IRequestHandler<AddPostRequest, Data.Models.Post>
{
    private readonly AppDBContext context = DBContext;

    public async ValueTask<Data.Models.Post> Handle(AddPostRequest request, CancellationToken cancellationToken)
    {
        var newPost = await context.Posts.AddAsync(request.Post, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return newPost.Entity;
    }

}
