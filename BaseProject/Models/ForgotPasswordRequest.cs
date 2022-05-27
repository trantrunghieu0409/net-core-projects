using System.ComponentModel.DataAnnotations;

namespace BaseProject.Models
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
