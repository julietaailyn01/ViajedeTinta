using Acceso_datos.Context;
using Acceso_datos.Models;
using Microsoft.EntityFrameworkCore;

namespace Acceso_datos.Services
{
    public class PersonalizacionService
    {
        private readonly ViajedetintaContext _context;

        public PersonalizacionService(ViajedetintaContext context)
        {
            _context = context;
        }

        public async Task<Personalizacione?> ObtenerPorItemPedidoIdAsync(int itemPedidoId)
        {
            return await _context.Personalizaciones.FirstOrDefaultAsync(p => p.ItemPedidoId == itemPedidoId);
        }

        public async Task<Personalizacione> CrearPersonalizacionAsync(Personalizacione personalizacion)
        {
            _context.Personalizaciones.Add(personalizacion);
            await _context.SaveChangesAsync();
            return personalizacion;
        }
    }
}
