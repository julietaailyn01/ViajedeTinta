using Acceso_datos.Context;
using Acceso_datos.Dtos;
using Acceso_datos.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Acceso_datos.Services
{
    public class AuthService
    {
        private readonly IConfiguration _config;
        private readonly ViajedetintaContext _context;
        private readonly EmailService _emailService;

        public AuthService(IConfiguration config, ViajedetintaContext context, EmailService emailService)
        {
            _config = config;
            _context = context;
            _emailService = emailService;
        }

        private string GenerateToken(Usuario user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim("nombre", user.Nombre),
                new Claim(ClaimTypes.Role, user.Rol.ToString())
            };

            var key = _config["Jwt:Key"];
            if (string.IsNullOrEmpty(key)) throw new Exception("JWT Key no está definida en appsettings.json");

            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];
            var durationMinutes = int.TryParse(_config["Jwt:DurationInMinutes"], out int duration) ? duration : 60;

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddMinutes(durationMinutes);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: expires,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string?> Register(RegisterDto dto)
        {
            // Si el email ya existe
            if (await _context.Usuarios.AnyAsync(u => u.Email == dto.Email))
                throw new Exception("El email ya está registrado.");

            var codigoVerificacion = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 6);

            var user = new Usuario
            {
                Email = dto.Email,
                Nombre = dto.Nombre,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                EmailVerificado = false,
                CodigoVerificacion = codigoVerificacion
            };

            _context.Usuarios.Add(user);
            await _context.SaveChangesAsync();

            var asunto = "Verificá tu correo";
            var cuerpo = $@"<h2>¡Bienvenido!</h2><p>Tu código es: <strong>{codigoVerificacion}</strong></p>";

            await _emailService.EnviarEmailAsync(dto.Email, asunto, cuerpo);

            return null; // No se devuelve token todavía
        }



        public async Task<bool> VerificarEmail(string email, string codigo)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || user.EmailVerificado || user.CodigoVerificacion != codigo)
                return false;

            user.EmailVerificado = true;
            user.CodigoVerificacion = null;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string?> Login(LoginDto dto)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !user.EmailVerificado) return null;
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash)) return null;

            return GenerateToken(user);
        }
    }
}
