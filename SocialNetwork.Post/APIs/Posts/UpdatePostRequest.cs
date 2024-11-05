namespace SocialNetwork.Post.APIs.Posts;

using Mediator;
using PostModel = SocialNetwork.Post.Data.Models.Post;

public class UpdatePostRequest (PostModel updatedPost)
    : IRequest<PostModel>
{
    public PostModel Post { get; } = updatedPost;
}