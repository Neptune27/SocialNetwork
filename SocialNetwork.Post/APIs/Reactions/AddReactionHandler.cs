using Mediator;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Reactions;

public class AddReactionHandler : IRequestHandler<AddReactionRequest, Reaction>
{
    private readonly AppDBContext context;

    public async ValueTask<Reaction> Handle(AddReactionRequest request, CancellationToken cancellationToken)
    {
        var result = await context.Reactions.AddAsync(request.Reaction, cancellationToken);
        await context.SaveChangesAsync();
        return result.Entity;
    }
}