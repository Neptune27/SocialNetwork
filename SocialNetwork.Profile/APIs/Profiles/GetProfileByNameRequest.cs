using Mediator;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Profiles;

public class GetProfileByNameRequest(string name) : IRequest<List<User>>
{
    public string Name { get; } = name;
}
