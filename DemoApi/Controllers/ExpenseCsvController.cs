using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using CsvHelper.Configuration;
using DemoApi.DbContext;
using DemoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoApi.Controllers
{
    [ApiController]
    [Route("api/csv")]
    public class ExpenseCsvController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpenseCsvController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadCsv([FromForm] IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file uploaded.");
                }

                // Parse the CSV data into objects
                var records = new List<ExpenseCsv>();
                using (var streamReader = new StreamReader(file.OpenReadStream()))
                using (var csvReader = new CsvReader(streamReader, new CsvConfiguration(CultureInfo.InvariantCulture)))
                {
                    records = csvReader.GetRecords<ExpenseCsv>().ToList();
                }

                // Save the records to the database
                _context.ExpenseCsv.AddRange(records);
                await _context.SaveChangesAsync();

                return Ok("CSV data successfully imported.");
            }
            catch (Exception ex)
            {
                // Handle errors and log them
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
