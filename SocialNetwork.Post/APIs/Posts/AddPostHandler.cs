using Mediator;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Posts;
public class AddPostHandler(
    AppDBContext DBContext
    ) : IRequestHandler<AddPostRequest, bool>
{
    private readonly AppDBContext context = DBContext;

    public async ValueTask<bool> Handle(AddPostRequest request, CancellationToken cancellationToken)
    {
        var newPost = await context.Posts.AddAsync(request.Post, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return true;
    }

}
