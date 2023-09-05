using DemoApi.DbContext;
using DemoApi.Models;
using DemoApi.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DemoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LoginController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Login
        [HttpPost]
        public IActionResult PostLogin([FromBody] Login login)
        {
            if (login == null)
            {
                return BadRequest("Invalid data");
            }

            // Save all fields to the database
            _context.Logins.Add(login);
            _context.SaveChanges();

            return Ok("Login data saved successfully");
        }

        // GET: api/Login/credentials/{id}
        [HttpGet("credentials/{id}")]
        public IActionResult GetLoginCredentials(int id)
        {
            var login = _context.Logins.FirstOrDefault(l => l.Id == id);

            if (login == null)
            {
                return NotFound();
            }

            // Extract only email and password
            var credentials = new LoginDto
            {
                Email = login.Email,
                Password = login.Password
            };

            return Ok(credentials);
        }
    }
}
