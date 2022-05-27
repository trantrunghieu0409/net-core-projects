using System.ComponentModel.DataAnnotations;

namespace BaseProject.Models
{
    public class VerifyRequest
    {
        [Required]
        public string Token { get; set; }
    }
}
