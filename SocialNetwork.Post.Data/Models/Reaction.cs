using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Models;
using SocialNetwork.Post.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Post.Data.Models;


[PrimaryKey(nameof(PostId), nameof(UserId))]
public class Reaction
{
    public int PostId { get; set; }

    public string UserId { get; set; }

    public BasicUser User { get; set; }

    [ForeignKey(nameof(PostId))]
    public Post Post { get; set; }

    public ReactionType ReactionType { get; set; }
}
