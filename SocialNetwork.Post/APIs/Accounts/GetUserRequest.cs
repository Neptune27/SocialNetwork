using Mediator;
using SocialNetwork.Core.Models;

namespace SocialNetwork.Post.APIs.Accounts;

public class GetUserRequest(string id) : IRequest<BasicUser>
{
    public string UserID { get; } = id;
}
