using Mediator;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Reactions;

public class UpdateReactionHandler(AppDBContext context)
    : IRequestHandler<UpdateReactionRequest, Reaction>
{
    private readonly AppDBContext context = context;

    public async ValueTask<Reaction> Handle(UpdateReactionRequest request, CancellationToken cancellationToken)
    {
        var reaction = request.Reaction;
        context.Reactions.Attach(reaction);
        var result = context.Reactions.Update(reaction);
        await context.SaveChangesAsync();
        return result.Entity;
    }
}