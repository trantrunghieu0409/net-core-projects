using System.ComponentModel.DataAnnotations;

namespace BaseProject.Models
{
    public class NewLoginRequest
    {
        [Required]
        public string IpAddress { get; set; }

        [Required]
        public string Token { get; set; }
    }
}
