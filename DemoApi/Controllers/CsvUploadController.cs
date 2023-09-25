using DemoApi.BussinesLayer.Interfaces;
using DemoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace DemoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CsvUploadController : ControllerBase
    {
        private readonly ICsvUpload _upload;

        public CsvUploadController(ICsvUpload upload)
        {
            _upload = upload;
        }

        [HttpPost, Route("UploadFile")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (CheckIfCSVFile(file))
            {
                var filePath = await _upload.WriteFile(file);
                string sendFile = await _upload.UploadDetailsAsync(filePath);
                //var csvData = await System.IO.File.ReadAllTextAsync(filePath);

                //var result = await _upload.UploadDetailsAsync(csvData);

                // Return the parsed CSV data in the response
                return Ok(sendFile);
            }
            else
            {
                return BadRequest(new { message = "Invalid File Extension" });
            }
        }

        private bool CheckIfCSVFile(IFormFile file)
        {
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            return (extension == ".csv" || extension == ".CSV");
        }
    }
}
