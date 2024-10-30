using Mediator;
using SocialNetwork.Post.Data;

namespace SocialNetwork.Post.APIs.Comments;

public class AddCommentHandler(AppDBContext DBContext) 
    : IRequestHandler<AddCommentRequest, bool>
{
    private readonly AppDBContext context = DBContext;

    public async ValueTask<bool> Handle(AddCommentRequest request, CancellationToken cancellationToken)
    { // Truy cập database
        try
        {
            var comment = await context.Comments.AddAsync(request.Comment, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);
            return true;
        }catch (Exception ex)
        {
            Console.WriteLine("ERROR: " + ex);
            return false;
        }
    }
}