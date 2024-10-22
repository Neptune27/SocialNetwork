using Mediator;
using PostModel = SocialNetwork.Post.Data.Models.Post;

namespace SocialNetwork.Post.APIs.Posts;

public class GetListPostRequest : IRequest<List<PostModel>>
{

}
