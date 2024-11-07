using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Comments;

public class AddCommentRequest(Comment comment) : IRequest<bool>
{
    public Comment Comment { get; } = comment;
}