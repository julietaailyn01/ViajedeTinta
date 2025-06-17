using Acceso_datos.Context;
using Acceso_datos.Models;
using Microsoft.EntityFrameworkCore;

namespace Acceso_datos.Services
{
    public class PedidoService
    {
        private readonly ViajedetintaContext _context;

        public PedidoService(ViajedetintaContext context)
        {
            _context = context;
        }

        public async Task<List<Pedido>> ObtenerPedidosAsync()
        {
            return await _context.Pedidos
                .Include(p => p.ItemsPedidos)
                .ThenInclude(i => i.Producto)
                .ToListAsync();
        }

        public async Task<Pedido> CrearPedidoAsync(Pedido pedido)
        {
            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();
            return pedido;
        }

        public async Task<Pedido?> ObtenerPedidoPorIdAsync(int id)
        {
            return await _context.Pedidos.Include(p => p.ItemsPedidos).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> ActualizarEstadoPedidoAsync(int id, string nuevoEstado)
        {
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido == null) return false;

            pedido.Estado = nuevoEstado;
            await _context.SaveChangesAsync();
            return true;
        }

    }
}