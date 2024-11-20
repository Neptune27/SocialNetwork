using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Reactions;

public class AddReactionRequest(Reaction reaction) : IRequest<Reaction>
{
    public Reaction Reaction { get; } = reaction;
}
