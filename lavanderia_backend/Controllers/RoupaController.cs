using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using lavanderia_backend.Models;

namespace lavanderia_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoupaController : ControllerBase
    {
        private readonly LavanderiaContext _context;

        public RoupaController(LavanderiaContext context)
        {
            _context = context;
        }

        // GET: api/roupa
        // Permite filtrar roupas lavadas com ?lavada=true ou false
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Roupa>>> Get([FromQuery] bool? lavada)
        {
            var query = _context.Roupa.AsQueryable();

            if (lavada.HasValue)
            {
                query = query.Where(r => r.Lavada == lavada.Value);
            }

            return await query.ToListAsync();
        }

        // POST: api/roupa
        // Cadastra nova roupa
        [HttpPost]
        public async Task<ActionResult<Roupa>> Post([FromBody] Roupa novaRoupa)
        {
            _context.Roupa.Add(novaRoupa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = novaRoupa.Id }, novaRoupa);
        }

        // PUT: api/roupa/{id}/lavar
        // Marca roupa como lavada
        [HttpPut("{id}/lavar")]
        public async Task<IActionResult> MarcarComoLavado(int id)
        {
            var roupa = await _context.Roupa.FindAsync(id);
            if (roupa == null) return NotFound();

            roupa.Status = "Lavado";
            roupa.Lavada = true;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/roupa/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var roupa = await _context.Roupa.FindAsync(id);
            if (roupa == null) return NotFound();

            _context.Roupas.Remove(roupa);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
