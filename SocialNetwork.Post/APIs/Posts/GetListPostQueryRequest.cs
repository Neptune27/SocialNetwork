using Mediator;
using PostModel = SocialNetwork.Post.Data.Models.Post;

namespace SocialNetwork.Post.APIs.Posts;

public class GetListPostQueryRequest(string userId, string query) : IRequest<List<PostModel>>
{
    public string UserId { get; } = userId;
    public string Query { get; } = query;
}
