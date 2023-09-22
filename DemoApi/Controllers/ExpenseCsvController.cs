using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using DemoApi.DbContext;
using DemoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSVReaderWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CSVController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CSVController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> ReadEmployeeCSV()
        {
            var stream = Request.Body;
            using (var reader = new StreamReader(stream))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var employees =  csv.GetRecordsAsync<ExpenseCsv>();

                _context.ExpenseCsv.AddRange((ExpenseCsv)employees);
                await _context.SaveChangesAsync();

                return Ok();
            }
        }
    }
}