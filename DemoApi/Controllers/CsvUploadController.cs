using DemoApi.DbContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http; // Add this for IFormFile
using CsvHelper;
using System.Globalization;
using System.IO;
using System.Threading.Tasks; // Add this for async
using System.Formats.Asn1;
using CsvHelper.Configuration;
using DemoApi.Models;

namespace DemoApi.Controllers
{
    [Route("api/csv")] // Add a route attribute to specify the route for this controller
    public class CsvUploadController : ControllerBase // Inherit from ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public CsvUploadController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadCsv(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Invalid file.");
            }

            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
            {
                var records = csv.GetRecords<CsvUpload>().ToList();
                _dbContext.CsvUploads.AddRange(records);
                await _dbContext.SaveChangesAsync();
            }

            return Ok("CSV data uploaded successfully.");
        }
    }
}
