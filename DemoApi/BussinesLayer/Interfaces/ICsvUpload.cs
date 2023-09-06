namespace DemoApi.BussinesLayer.Interfaces
{
    public interface ICsvUpload
    {
        public Task<string> GetUploadCSVAsync(CsvUpload uploads);
        Task GetUploadCSVAsync(Models.CsvUpload upload);
        public Task<string> WriteFile(IFormFile file);
    }
}
