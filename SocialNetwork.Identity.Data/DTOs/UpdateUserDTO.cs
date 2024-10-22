using SocialNetwork.Identity.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Identity.Data.DTOs;

public record UpdateUserDTO(UpdateType Type, string Content);
