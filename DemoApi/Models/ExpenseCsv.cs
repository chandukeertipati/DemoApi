using System.ComponentModel.DataAnnotations;

namespace DemoApi.Models
{
    public class ExpenseCsv
    {
        [Key]
        public int Id { get; set; }
        public string Month { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
    }
}
