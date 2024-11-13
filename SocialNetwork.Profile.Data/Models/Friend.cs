using SocialNetwork.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Profile.Data.Models;

public class Friend : BaseModel
{
    public string UserToId { get; set; } = null!;
    public User UserTo { get; set; } = null!;

    public string UserFromId { get; set; } = null!;
    public User UserFrom { get; set; } = null!;

}
