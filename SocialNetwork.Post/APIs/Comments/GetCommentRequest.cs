using Mediator;
using SocialNetwork.Post.Data.Models;

namespace SocialNetwork.Post.APIs.Comments;

public class GetCommentRequest(int commentId) : IRequest<Comment> 
{ 
    public int CommentId { get; } = commentId;
}