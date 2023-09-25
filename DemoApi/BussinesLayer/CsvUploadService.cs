using AutoMapper;
using DemoApi.BussinesLayer.Interfaces;
using DemoApi.DbContext;
using DemoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Threading.Tasks;

namespace DemoApi.BussinesLayer
{
    public class CsvUploadService : ICsvUpload
    {
        private readonly AppDbContext _context;
        public CsvUploadService(AppDbContext context)
        {
            _context = context;
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
            {
                return ex.Message;
            }
        }

        public async Task<string> UploadDetailsAsync(string filePath)
        {
            try
            {
                var csvData = await File.ReadAllTextAsync(filePath);
                ;
                var lines = csvData.Split('\n');

                foreach (var line in lines)
                {
                    var values = line.Split(',');

                    if (values.Length == 2)
                    {
                        string name = values[0].Trim();
                        string age = values[1].Trim();
                        //if (int.TryParse(values[1].Trim(), out int age))
                        if (name != "name")
                        {
                            CsvUpload csvUpload = new CsvUpload();
                            csvUpload.Name = name;
                            csvUpload.Age = Convert.ToInt32(age);
                            _context.CsvUploads.Add(csvUpload);
                        }
                    }                    
                }
                await _context.SaveChangesAsync();
                return "Details UPloaded Successfully";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }
}

