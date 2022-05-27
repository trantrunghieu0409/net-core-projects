using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace BaseProject.Entities
{
    [Owned]
    public class RefreshToken
    {
        [Key]
        public int Id { get; set; }
        public string? UserName { get; set; }

        public string? Token { get; set; }

        public DateTime CreatedDate => DateTime.UtcNow;
        public DateTime? ExpiredDate { get; set; }
        public DateTime? RevokedDate { get; set; }
        public string? CreatedByIpAddress { get; set; }

        public string? ReplacedByToken { get; set; }
        public string? RevokedByIp { get; set; }

        public bool IsExpired => DateTime.UtcNow >= ExpiredDate;
        public bool IsRevoked => RevokedDate != null;
        public bool IsActive => RevokedDate == null && !IsExpired;
    }
}
