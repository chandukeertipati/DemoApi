using System.ComponentModel.DataAnnotations;

namespace DemoApi.Models
{
    public class Expense
    {
        internal readonly object Month;

        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
    }


}
