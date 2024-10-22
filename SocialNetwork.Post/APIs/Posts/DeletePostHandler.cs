using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Post.Data;

namespace SocialNetwork.Post.APIs.Posts;

public class DeletePostHandler : IRequestHandler<DeletePostRequest, bool>
{
    private readonly AppDBContext dBContext;

    public DeletePostHandler(AppDBContext dBContext)
    {
        this.dBContext = dBContext;
    }

    public async ValueTask<bool> Handle(DeletePostRequest request, CancellationToken cancellationToken)
    {
        var post = await dBContext.Posts.FirstOrDefaultAsync(p => p.Id == request.PostId && p.User.Id == request.UserId);
        if (post is null)
        {
            return false;
        }
        post.Visibility = Core.Enums.EVisibility.HIDDEN;
        await dBContext.SaveChangesAsync(cancellationToken);
        return true;

    }
}
