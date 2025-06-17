using Acceso_datos.Dtos;
using Acceso_datos.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var email = User.Identity?.Name;
            var nombre = User.Claims.FirstOrDefault(c => c.Type == "nombre")?.Value;
            var rol = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

            return Ok(new { email, nombre, rol });
        }

        [HttpPost("verify")]
        public async Task<IActionResult> Verify([FromBody] VerifyEmailDto dto)
        {
            var result = await _authService.VerificarEmail(dto.Email, dto.Codigo);
            if (!result)
                return BadRequest(new { message = "Código inválido o correo no encontrado." });

            return Ok(new { message = "Correo verificado con éxito. Ya podés iniciar sesión." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var token = await _authService.Login(dto);
            if (token == null)
                return Unauthorized(new { message = "Credenciales inválidas." });

            return Ok(new { token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var token = await _authService.Register(dto);
            if (token == null)
                return Ok(new
                {
                    success = true,
                    emailVerificationRequired = true,
                    message = "Revisá tu correo para confirmar el registro."
                });

            return Ok(new { success = true, token });
        }


        [HttpPost("confirmar-email")]
        public async Task<IActionResult> ConfirmarEmail([FromBody] ConfirmarEmailDto dto)
        {
            var resultado = await _authService.VerificarEmail(dto.Email, dto.Codigo);
            if (!resultado) return BadRequest(new { message = "Código incorrecto o ya verificado." });

            return Ok(new { message = "Email verificado correctamente. Ahora podés iniciar sesión." });
        }


    }
}

