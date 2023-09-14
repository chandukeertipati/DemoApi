using DemoApi.DbContext;
using DemoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpenseController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult PostExpense(Expense expense)
        {
            _context.Expenses.Add(expense);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<Expense>> GetExpenses()
        {
            return Ok(_context.Expenses.ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<Expense> GetExpenseById(int id)
        {
            var expense = _context.Expenses.FirstOrDefault(e => e.Id == id);
            if (expense == null)
            {
                return NotFound();
            }
            return Ok(expense);
        }

        [HttpPut("{id}")]
        public IActionResult PutExpense(int id, Expense expense)
        {
            if (id != expense.Id)
            {
                return BadRequest();
            }

            _context.Entry(expense).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExpense(int id)
        {
            var expense = _context.Expenses.Find(id);
            if (expense == null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expense);
            _context.SaveChanges();

            return NoContent();
        }

        private bool ExpenseExists(int id)
        {
            return _context.Expenses.Any(e => e.Id == id);
        }
    }
}
