using AutoMapper;
using DemoApi.BussinesLayer.Interfaces;

namespace DemoApi.BussinesLayer
{
    public class CsvUpload : ICsvUpload
    {
        private readonly IMapper _mapper;
        public CsvUpload(IMapper mapper)
        {
            _mapper = mapper;
        }
        public async Task<string> GetUploadCSVAsync(CsvUpload uploadModel)
        {
            return "CSV File Uploaded";
        }

        public Task GetUploadCSVAsync(Models.CsvUpload upload)
        {
            throw new NotImplementedException();
        }

        public async Task<string> WriteFile(IFormFile file)
        {
            string fileName;
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                fileName = DateTime.Now.Ticks + extension;
                var pathBuilt = Path.Combine(Directory.GetCurrentDirectory(), "Resources\\Files");
                if (!Directory.Exists(pathBuilt))
                {
                    Directory.CreateDirectory(pathBuilt);
                }
                var path = Path.Combine(Directory.GetCurrentDirectory(), "Resources\\Files", fileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return path;
            }
            catch (Exception ex)
            { }
            return "";
        }
    }
}
