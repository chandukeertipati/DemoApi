using DemoApi.BussinesLayer;
using DemoApi.BussinesLayer.Interfaces;
using DemoApi.DbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace DemoApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}


