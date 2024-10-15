using Microsoft.EntityFrameworkCore;
using SocialNetwork.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Post.Data.Models;


[PrimaryKey(nameof(CommentId), nameof(UserId))]
public class CommentReaction
{
    public string UserId { get; set; }

    public BasicUser User { get; set; }

    public int CommentId { get; set; }

    [ForeignKey(nameof(CommentId))]
    public Comment Comment { get; set; }

    public DateTime CreatedAt { get; set; }

}
