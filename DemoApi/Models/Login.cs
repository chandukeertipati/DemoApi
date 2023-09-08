using System.ComponentModel.DataAnnotations;

namespace DemoApi.Models
{
    public class Login
    {
        [Key]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
