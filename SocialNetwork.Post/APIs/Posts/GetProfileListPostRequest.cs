using Mediator;
using PostModel = SocialNetwork.Post.Data.Models.Post;

namespace SocialNetwork.Post.APIs.Posts;

public class GetProfileListPostRequest(string userId) : IRequest<List<PostModel>>
{
    public string UserId { get; } = userId;
}
