using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Reactions;

public class UpdateReactionRequest(Reaction reaction) : IRequest<Reaction>
{
    public Reaction Reaction { get; } = reaction;
}
