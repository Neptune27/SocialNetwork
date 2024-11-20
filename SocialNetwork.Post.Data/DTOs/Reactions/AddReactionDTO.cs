using SocialNetwork.Post.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Post.Data.DTOs.Reactions;

public class ReactionDTO
{
    [Required]
    public int PostID { get; set; }

    [Required]
    public ReactionType ReactionType { get; set; } 
}
