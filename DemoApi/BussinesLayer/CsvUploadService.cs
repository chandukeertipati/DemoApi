using AutoMapper;
using DemoApi.BussinesLayer.Interfaces;
using DemoApi.DbContext;
using DemoApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DemoApi.BussinesLayer
{
    public class CsvUploadService : ICsvUpload
    {
        private readonly AppDbContext _context;
        public CsvUploadService(AppDbContext context)
        {
            _context = context;
        }
        //public async Task<string> GetUploadCSVAsync(CsvUploadService uploadModel)
        //{
        //    return "CSV File Uploaded";
        //}

        //public Task GetUploadCSVAsync(Models.CsvUpload upload)
        //{
        //    throw new NotImplementedException();
        //}

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
            {
                return ex.Message;
            }

        }
        public async Task<CsvUpload> UploadDetailsAsync(CsvUpload csvUpload)
        {
            CsvUpload model = new CsvUpload();
            model.Id = csvUpload.Id;
            model.Name = csvUpload.Name;
            model.Age = csvUpload.Age;
            _context.CsvUploads.Add(model);
            await _context.SaveChangesAsync();

            return model;

        }


    }
}