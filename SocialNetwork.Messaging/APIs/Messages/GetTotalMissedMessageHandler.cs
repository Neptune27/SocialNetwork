using Mediator;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Messaging.Data;

namespace SocialNetwork.Messaging.APIs.Messages;


public class GetTotalMissedMessageHandler(AppDBContext dBContext) : IRequestHandler<GetTotalMissedMessageRequest, int>
{
    private readonly AppDBContext dBContext = dBContext;

    public async ValueTask<int> Handle(GetTotalMissedMessageRequest request, CancellationToken cancellationToken)
    {
        var totalMessages = from m in dBContext.Messages
                    join rls in dBContext.RoomsLastSeen on m.Room.Id equals rls.RoomId
                    where (rls.UserId == request.UserId && rls.LastSeen < m.CreatedAt)
                    select m;

        return await totalMessages.CountAsync(cancellationToken: cancellationToken);
    }
}
