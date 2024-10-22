using Mediator;

namespace SocialNetwork.Post.APIs.Posts
{
    public class DeletePostRequest:IRequest<bool>
    {
        public int PostId { get; set; }
        public string UserId { get; set; }

        public DeletePostRequest(int postId, string userId)
        {
            PostId = postId;
            UserId = userId;
        }
    }
}
