using PostModel = SocialNetwork.Post.Data.Models.Post;

namespace SocialNetwork.Post.Data.DTOs
{
    public class CommentDTO
    {
        public string Message { get; set; }
        public int PostId { get; set; }
    }
}
