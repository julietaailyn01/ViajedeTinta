using Acceso_datos.Context;
using Acceso_datos.Models;
using Microsoft.EntityFrameworkCore;

namespace Acceso_datos.Services
{
    public class ProductoService
    {
        private readonly ViajedetintaContext _context;

        public ProductoService(ViajedetintaContext context)
        {
            _context = context;
        }

        public async Task<List<Producto>> ObtenerProductosAsync()
        {
            return await _context.Productos.ToListAsync();
        }

        public async Task<Producto?> ObtenerProductoPorIdAsync(int id)
        {
            return await _context.Productos.FindAsync(id);
        }

        public async Task<Producto> CrearProductoAsync(Producto producto)
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();
            return producto;
        }

        public async Task<bool> ActualizarProductoAsync(int id, Producto productoActualizado)
        {
            var existente = await _context.Productos.FindAsync(id);
            if (existente == null) return false;

            existente.Nombre = productoActualizado.Nombre;
            existente.Descripcion = productoActualizado.Descripcion;
            existente.Precio = productoActualizado.Precio;
            existente.Categoria = productoActualizado.Categoria;
            existente.ImagenUrl = productoActualizado.ImagenUrl;
            existente.Personalizable = productoActualizado.Personalizable;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> EliminarProductoAsync(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null) return false;

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
