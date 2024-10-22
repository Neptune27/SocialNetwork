using SocialNetwork.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Profile.Data.Models;

public class User : BaseModel, ICloneable
{
    [Key]
    public string Id { get; set; }

    public string UserName { get; set; }

    public string ProfilePicture { get; set; }

    public DateOnly BirthDay { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Background { get; set; }

    public List<User> Friends { get; set; } = [];

    public string FullName => $"{FirstName} {LastName}";

    public string Location { get; set; }

    public string Instagram { get; set; }

    public string Twitter { get; set; }

    public string Github { get; set; }

	public object Clone()
	{
        return this.MemberwiseClone();
	}
}
