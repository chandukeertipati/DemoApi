﻿using System.ComponentModel.DataAnnotations;

namespace DemoApi.Models
{
    public class Expense
    {

        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; }
    }


}
