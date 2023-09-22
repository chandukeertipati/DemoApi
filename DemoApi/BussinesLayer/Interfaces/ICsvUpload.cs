namespace DemoApi.BussinesLayer.Interfaces
{
    public interface ICsvUpload
    {
        public Task<string> GetUploadCSVAsync(CsvUpload uploads);
        //Task GetUploadCSVAsync(CsvUpload upload);
        public Task<string> WriteFile(IFormFile file);
    }
}
