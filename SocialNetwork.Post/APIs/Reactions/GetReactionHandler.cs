using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Reactions;

public class GetReactionHandler(AppDBContext context)
    : IRequestHandler<GetReactionRequest, Reaction>
{
    private readonly AppDBContext context = context;

    public async ValueTask<Reaction> Handle(GetReactionRequest request, CancellationToken cancellationToken)
    {
        var result = await context.Reactions
            .Include(r => r.User)
            .Include(r => r.Post)
            .FirstOrDefaultAsync(r => r.UserId == request.UserId && r.PostId == request.PostId);
        return result;
    }
}