namespace SocialNetwork.Identity.DTOs.Account;

public record TokenResultDto(string UserId, string Username, string Email, string Token)
{
}
