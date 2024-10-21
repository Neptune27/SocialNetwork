using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs
{
    public class AddPostRequest(Data.Models.Post post) : IRequest<bool>
    {
        public Data.Models.Post Post { get; } = post;
    }
}
