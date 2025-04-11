using Microsoft.AspNetCore.Mvc;
using lavanderia_backend.Models;

namespace lavanderia_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoupaController : ControllerBase
    {
        private static List<Roupa> roupas = new();
        private static int contadorId = 1;

        [HttpGet]
        public ActionResult<List<Roupa>> Get() => roupas;

        [HttpPost]
        public ActionResult<Roupa> Post([FromBody] Roupa novaRoupa)
        {
            novaRoupa.Id = contadorId++;
            roupas.Add(novaRoupa);
            return CreatedAtAction(nameof(Get), new { id = novaRoupa.Id }, novaRoupa);
        }

        [HttpPut("{id}/lavar")]
        public IActionResult MarcarComoLavado(int id)
        {
            var roupa = roupas.FirstOrDefault(r => r.Id == id);
            if (roupa == null) return NotFound();

            roupa.Status = "Lavado";
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var roupa = roupas.FirstOrDefault(r => r.Id == id);
            if (roupa == null) return NotFound();

            roupas.Remove(roupa);
            return NoContent();
        }
    }
}
