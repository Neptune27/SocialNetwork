using SocialNetwork.Core.Models;
using SocialNetwork.Post.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Post.Models
{
    public class Post
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        public BasicUser User { get; set; }

        public string Message { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<string> Medias { get; set; }

        public List<Reaction> Reactions { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
