using Mediator;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.DTOs;

namespace SocialNetwork.Post.APIs
{
    public class GetPostRequest(PostDTO post) : IRequest<bool>
    {

    }
}
