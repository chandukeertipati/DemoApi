using DemoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using DemoApi.BussinesLayer.Interfaces;
namespace DemoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CsvUploadController : ControllerBase
    {
        private readonly ICsvUpload _Upload;
    public CsvUploadController(ICsvUpload upload)
    {
        _Upload = upload;
    }
    [HttpPost("UploadFile")]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        if (CheckIfCSVFile(file))
        {
            var fileUploader = await _Upload.WriteFile(file);
            return Ok(fileUploader);
        }
        else
        {
            return BadRequest(new { message = "Invlaid File Extension" });
        }
    }
    //[HttpPost("UploadCsv")]
    //public async Task<IActionResult> UploadCsv([FromBody] CsvUpload upload)
    //{
    //    try
    //    {
    //        //var uploadModel = await _Upload.GetUploadCSVAsync(upload);
    //        //return Ok(uploadModel);
    //    }
    //    catch (Exception ex)
    //    {
    //        return BadRequest(ex);
    //    }
    //}
        private bool CheckIfCSVFile(IFormFile file)
        {
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            return (extension == ".csv" || extension == ".CSV");
        }
    }
}