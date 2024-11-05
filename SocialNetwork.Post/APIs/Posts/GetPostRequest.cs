using Mediator;
using SocialNetwork.Post.Data;
using SocialNetwork.Post.Data.DTOs;

namespace SocialNetwork.Post.APIs.Posts
{
    public class GetPostRequest(int postID) : IRequest<Data.Models.Post>
    {
        public int PostID { get; set; } = postID;
    }
}
