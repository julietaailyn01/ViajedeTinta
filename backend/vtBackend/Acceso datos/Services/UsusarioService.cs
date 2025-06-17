using Acceso_datos.Context;
using Acceso_datos.Models;
using Microsoft.EntityFrameworkCore;

namespace Acceso_datos.Services
{
    public class UsuarioService
    {
        private readonly ViajedetintaContext _context;

        public UsuarioService(ViajedetintaContext context)
        {
            _context = context;
        }

        public async Task<List<Usuario>> ObtenerUsuariosAsync()
        {
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<Usuario?> ObtenerUsuarioPorIdAsync(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<Usuario> CrearUsuarioAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }
    }
}
