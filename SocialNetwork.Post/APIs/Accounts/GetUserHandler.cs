using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Models;
using SocialNetwork.Post.Data;

namespace SocialNetwork.Post.APIs.Accounts;

public class GetUserHandler(AppDBContext context)
    : IRequestHandler<GetUserRequest, BasicUser>
{
    private readonly AppDBContext context = context;
    
    public async ValueTask<BasicUser> Handle(GetUserRequest request, CancellationToken cancellationToken)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == request.UserID);
        return user;
    }
}
