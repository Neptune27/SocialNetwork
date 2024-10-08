using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Identity.DTOs.Account;

public class LoginDto
{
    [Required]
    public string? Username { get; set; }

    [Required]
    public string? Password { get; set; }

}