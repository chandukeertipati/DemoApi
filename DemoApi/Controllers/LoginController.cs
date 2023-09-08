using DemoApi.DbContext;
using DemoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

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

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Retrieve the user from the database based on the provided email.
            var user = await _context.Logins.FirstOrDefaultAsync(u => u.Email == model.Email);

            if (user == null)
            {
                return NotFound("User not found");
            }
            else
            {
                if (model.Email==user.Email && model.Password==user.Password)
                {
                    return Ok("Login successful");

                }
                return BadRequest("invalid user");
            }

            // Check the password (You should hash and compare it securely).
           

            // Perform any necessary user authentication here.

        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetUserEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Email is required.");
            }

            // Retrieve the user from the database based on the provided email.
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Return only the email address, not the password.
            return Ok(new { Email = user.Email });
        }
    }
}
