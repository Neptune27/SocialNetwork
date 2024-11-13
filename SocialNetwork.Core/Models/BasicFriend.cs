using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Core.Models;

public class BasicFriend : BaseModel
{
    public string UserToId { get; set; } = null!;
    public BasicUser UserTo { get; set; } = null!;

    public string UserFromId { get; set; } = null!;
    public BasicUser UserFrom { get; set; } = null!;

}
