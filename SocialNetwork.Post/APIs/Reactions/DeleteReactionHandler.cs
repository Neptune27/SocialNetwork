using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Reactions;

public class DeleteReactionHandler(AppDBContext context)
    : IRequestHandler<DeleteReactionRequest, Reaction>
{
    private readonly AppDBContext context = context;

    public async ValueTask<Reaction> Handle(DeleteReactionRequest request, CancellationToken cancellationToken)
    {
        var reaction = await context.Reactions
            .FirstOrDefaultAsync(r => r.PostId == request.PostID && r.UserId == request.UserId);
        
        context.Attach(reaction);
        reaction.Visibility = Core.Enums.EVisibility.HIDDEN;
        var result = context.Reactions.Update(reaction);
        await context.SaveChangesAsync();
        return result.Entity;
    }
}
