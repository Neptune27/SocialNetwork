using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Core.Models;

public class BasicFriend : BaseModel
{
    public string UserTosId { get; set; } = null!;

    public string UserFromsId { get; set; } = null!;

}
