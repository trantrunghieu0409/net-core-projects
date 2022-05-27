using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace BaseProject.Entities
{
    [Owned]
    public class IpAddress
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Ip { get; set; }
    }
}
