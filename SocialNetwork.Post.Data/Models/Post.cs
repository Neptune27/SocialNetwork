using SocialNetwork.Core.Enums;
using SocialNetwork.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Post.Data.Models;


public class Post : BaseModel
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }

    public BasicUser User { get; set; }

    public string Message { get; set; }

    public List<string> Medias { get; set; }

    public List<Reaction> Reactions { get; set; }

    public List<Comment> Comments { get; set; }

}
