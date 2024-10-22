using SocialNetwork.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Core.Models;

public class BaseModel
{
    public DateTime CreatedAt { get; set; }

    public DateTime LastUpdated { get; set; }

    public EVisibility Visibility { get; set; }

}
