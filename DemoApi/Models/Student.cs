using System.ComponentModel.DataAnnotations;

namespace DemoApi.Models
{
    public class Student
    {
        [Key]
        public int StudentId { get; set; }
        public string StudentName { get; set; }
        public string EmailId { get; set; }
    }
}
