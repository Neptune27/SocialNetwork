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

    public Post Post { get; set; } = new Post();

    public List<CommentReaction> Reactions { get; set; } = new List<CommentReaction>();

    public Comment ReplyTo { get; set; } = new Comment();

    public List<Comment> Replys { get; set; } = new List<Comment>();

    public string Message { get; set; }

    public List<string> Medias { get; set; } = new List<string>();

}
