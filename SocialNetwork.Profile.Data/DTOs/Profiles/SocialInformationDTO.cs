using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Profile.Data.DTOs.Profiles
{
	public record SocialInformationDTO(string location, string instagram, string twitter, string github)
	{
	}
}
