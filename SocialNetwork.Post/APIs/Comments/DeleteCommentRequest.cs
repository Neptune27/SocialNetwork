using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Comments;

public class DeleteCommentRequest(int commentId, string userId) : IRequest<Comment>
{
    public int CommentId { get; } = commentId;
    public string UserId { get; } = userId;
}