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
        public DbSet<Login> Logins { get; set; }
        public DbSet<CsvUpload> CsvUploads { get; set; }
    }
}
