using SocialNetwork.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Post.Data.Models;

public class Comment : BaseModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public BasicUser User { get; set; }

    public Post Post { get; set; }

    public List<CommentReaction> Reactions { get; set; } = [];

    public Comment? ReplyTo { get; set; }

    public List<Comment> Replys { get; set; } = [];

    public string Message { get; set; }

    public List<string> Medias { get; set; } = [];

}
