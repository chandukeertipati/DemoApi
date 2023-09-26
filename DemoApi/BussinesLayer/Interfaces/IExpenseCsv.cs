using DemoApi.Models;
using System.Threading.Tasks;

namespace DemoApi.BussinesLayer.Interfaces
{
    public interface IExpenseCsvUpload
    {
        Task<string> WriteFile(IFormFile file);
        Task<string> UploadDetailsAsync(string csvData);
        Task<List<ExpenseCsv>> GetExpenses();
        Task<ExpenseCsv> GetByMonth(string month);
    }
}
