using System.ComponentModel.DataAnnotations;

namespace BaseProject.Models
{
    public class UpdateRequest
    {
        public string? Title { get; set; }
        
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        
        public string? Role { get; set; }

        // change password will be updated later
    }
}
