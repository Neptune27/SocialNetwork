using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Profile.Data;
using SocialNetwork.Profile.Data.DTOs.Friends;
using SocialNetwork.Profile.Data.Models;

namespace SocialNetwork.Profile.APIs.Friends
{
	public class GetFriendRequestHandler(AppDBContext dBContext) : IRequestHandler<GetFriendRequestRequest, FriendRequest>
	{
		private readonly AppDBContext dBContext = dBContext;
		public async ValueTask<FriendRequest> Handle(GetFriendRequestRequest request, CancellationToken cancellationToken)
		{
			var result = await dBContext.FriendRequests
			.Include(f => f.Sender)
			.Include(f => f.Reciever)
			.FirstOrDefaultAsync(f => (f.Sender.Id == request.UserId || f.Reciever.Id == request.UserId) && (f.Sender.Id == request.Id || f.Reciever.Id == request.Id), cancellationToken: cancellationToken);
			if (result is null)
			{
				return null;
			}

			return result;
		}
	}
}
