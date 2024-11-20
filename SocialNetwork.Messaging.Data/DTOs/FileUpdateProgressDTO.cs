using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Messaging.Data.DTOs;

public record FileUpdateProgressDTO(string FileName, double Progress)
{
}
