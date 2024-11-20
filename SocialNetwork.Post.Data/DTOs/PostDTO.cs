using SocialNetwork.Profile.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Post.Data.DTOs
{
    public class PostDTO
    {
        public string Message { get; set; }

        public List<string> Medias { get; set; }

    }
}
