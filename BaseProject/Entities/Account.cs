using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace BaseProject.Entities
{
    public class Account
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public Role Role { get; set; }

        public string? Token { get; set; }
        
        [JsonIgnore]
        public string? PasswordHash { get; set; }


        public DateTime CreatedDate => DateTime.UtcNow;
        public DateTime? LastUpdatedDate { get; set; }
        public DateTime? ExpiredDate { get; set; }


        public bool IsExpired => DateTime.UtcNow >= ExpiredDate;
        public bool IsVerified => VerifyDate != null;
        public string? VerifyToken { get; set; }
        public DateTime? VerifyDate { get; set; }

        [JsonIgnore]
        public List<RefreshToken>? RefreshTokens { get; set; }
        public string? ResetToken { get; set; }
        public DateTime ResetTokenExpires { get; internal set; }

        [JsonIgnore]
        public List<IpAddress>? IpAddresses { get; set; }
        public string? NewLoginToken { get; set; }
        public DateTime? NewLoginExpires { get; set; }
    }
}
