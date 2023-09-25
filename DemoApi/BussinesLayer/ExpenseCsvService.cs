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
    public class ExpenseCsvService : IExpenseCsvUpload
    {
        private readonly AppDbContext _context;
        public ExpenseCsvService(AppDbContext context)
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
                var lines = csvData.Split('\n');

                foreach (var line in lines)
                {
                    var values = line.Split(',');

                    if (values.Length == 4) // Check if there are 4 columns
                    {
                        string month = values[0].Trim();
                        if (month != "Month") // Skip the header row
                        {
                            string dateStr = values[1].Trim();
                            if (DateTime.TryParse(dateStr, out DateTime date))
                            {
                                string amountStr = values[2].Trim();
                                if (decimal.TryParse(amountStr, out decimal amount))
                                {
                                    string description = values[3].Trim();

                                    // Create and add the ExpenseCsv object to the context
                                    ExpenseCsv expenseCsvUpload = new ExpenseCsv();
                                    expenseCsvUpload.Month = month;
                                    expenseCsvUpload.Date = date;
                                    expenseCsvUpload.Amount = amount;
                                    expenseCsvUpload.Description = description;
                                    _context.ExpenseCsv.Add(expenseCsvUpload);
                                }
                            }
                        }
                    }
                }

                await _context.SaveChangesAsync();
                return "Details Uploaded Successfully";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }
}

