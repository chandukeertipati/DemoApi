using DemoApi.Models;
using System.Threading.Tasks;

namespace DemoApi.BussinesLayer.Interfaces
{
    public interface ICsvUpload
    {
        Task<string> WriteFile(IFormFile file);
        Task<string> UploadDetailsAsync(string csvData);
    }
}
