using DemoApi.Models;

namespace DemoApi.BussinesLayer.Interfaces
{
    public interface ICsvUpload
    {
        //public Task<string> GetUploadCSVAsync(CsvUploadService uploads);
        //Task GetUploadCSVAsync(CsvUpload upload);
        public Task<string> WriteFile(IFormFile file);
        Task<CsvUpload> UploadDetailsAsync(CsvUpload upload);
    }
}
