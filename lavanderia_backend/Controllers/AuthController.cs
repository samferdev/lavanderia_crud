using Microsoft.AspNetCore.Mvc;
using lavanderia_backend.Models;

namespace lavanderia_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LavanderiaContext _context;

        public AuthController(LavanderiaContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel loginData)
        {
            var usuario = _context.Usuarios
                .FirstOrDefault(u => u.NomeUsuario == loginData.Username && u.Senha == loginData.Password);

            if (usuario == null)
                return Unauthorized(new { message = "Usuário ou senha inválidos" });

            return Ok(new
            {
                token = "admin-token-123",
                usuario = usuario.NomeUsuario
            });
        }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
