﻿using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Identity.DTOs.Account;

public class RegisterDto
{
    [Required]
    public string? UserName { get; set; }

    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    public string? Password { get; set; }

    [Required]
    public string? FirstName { get; set; }

    [Required]
    public string? LastName { get; set; }

    [Required]
    public DateOnly BirthDay { get; set; }

    [Required]
    public string? Gender { get; set; }

}