using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Posts;

public class GetListCommentRequest(int postId) : IRequest<List<Comment>>
{
    public int PostId { get; } = postId;
}
