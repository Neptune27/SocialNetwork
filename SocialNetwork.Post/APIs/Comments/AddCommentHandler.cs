using MassTransit;
using Mediator;
using SocialNetwork.Notifications.Data.Models;
using SocialNetwork.Post.Data;

namespace SocialNetwork.Post.APIs.Comments;

public class AddCommentHandler(AppDBContext DBContext, IBus bus) 
    : IRequestHandler<AddCommentRequest, bool>
{
    private readonly AppDBContext context = DBContext;
    private readonly IBus bus = bus;

    public async ValueTask<bool> Handle(AddCommentRequest request, CancellationToken cancellationToken)
    { 
        // Truy cập database
        try
        {
            var comment = await context.Comments.AddAsync(request.Comment, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);

            Notification notify = new()
            {
                CreatedAt = DateTime.UtcNow,
                IsRead = false,
                FromId = comment.Entity.Id.ToString(),
                Type = ENotificationType.POST,
                Message = $"{comment.Entity.User.Name} make a comment on your post",
                UserId = comment.Entity.User.Id,
            };

            await bus.Publish(notify, cancellationToken);

            return true;
        }catch (Exception ex)
        {
            Console.WriteLine("ERROR: " + ex);
            return false;
        }
    }
}