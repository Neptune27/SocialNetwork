using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Comments
{
    public class UpdateCommentRequest(Comment comment) : IRequest<Comment>
    {
        public Comment comment { get; } = comment;
    }
}
