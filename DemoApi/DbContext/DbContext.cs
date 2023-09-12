using DemoApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DemoApi.DbContext
{
    public class AppDbContext : IdentityDbContext 
    { 
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        { } 
        public DbSet<Student> Students { get; set; } 
        public DbSet<Register> Logins { get; set; }
        public DbSet<CsvUpload> CsvUploads { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Specify the precision and scale for the Amount property in the Expense entity
            modelBuilder.Entity<Expense>()
                .Property(e => e.Amount)
                .HasPrecision(18, 4); // Adjust precision and scale as needed
        }


    }
}
