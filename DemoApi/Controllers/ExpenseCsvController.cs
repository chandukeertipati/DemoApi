using CsvHelper;
using CsvHelper.Configuration;
using DemoApi.BussinesLayer.Interfaces;
using DemoApi.DbContext;
using DemoApi.Dtos;
using DemoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class ExpenseCsvController : ControllerBase
{
    private readonly IExpenseCsv _csvService;


    public ExpenseCsvController(IExpenseCsv csvService)
    {
        _csvService = csvService;
    }

    [HttpPost("write-employee-csv")]
    public async Task<IActionResult> WriteEmployeeCSV([FromBody] List<ExpenseCsv> employees)
    {
        _csvService.WriteCSV<ExpenseCsv>(employees);

        return Ok();
    }

    [HttpPost("read-employees-csv")]
    public async Task<IActionResult> GetEmployeeCSV([FromForm] IFormFileCollection file)
    {
        var employees = _csvService.ReadCSV<ExpenseCsv>(file[0].OpenReadStream());

        return Ok(employees);
    }
}



