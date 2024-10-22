using SocialNetwork.Profile.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Profile.Data.DTOs
{
	public class ProfileDTO
	{
		public User User { get; set; }

		public bool IsVisitor { get; set; }
	}
}
