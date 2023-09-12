using DemoApi.DbContext;
using DemoApi.Models;
using DemoApi.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace DemoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegisterController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Register
        [HttpPost]
        public IActionResult PostLogin([FromBody] Register login)
        {
            if (login == null)
            {
                return BadRequest("Invalid data");
            }

            // Save all fields to the database
            _context.Logins.Add(login);
            _context.SaveChanges();

            return Ok(new { Message = "Login data saved successfully" });
        }

        // GET: api/Register
        [HttpGet]
        public IActionResult GetAllLogins()
        {
            // Retrieve all records and select only email and password
            var credentialsList = _context.Logins
                .Select(login => new LoginDto
                {
                    Email = login.Email,
                    Password = login.Password
                })
                .ToList();

            return Ok(credentialsList);
        }
    }
}
