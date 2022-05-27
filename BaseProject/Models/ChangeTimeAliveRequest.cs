using System.ComponentModel.DataAnnotations;

namespace BaseProject.Models
{
    public class ChangeTimeAliveRequest
    {
        [Required]
        public int time { get; set; }
    }
}
