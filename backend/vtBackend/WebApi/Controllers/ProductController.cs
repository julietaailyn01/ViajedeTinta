using Microsoft.AspNetCore.Mvc;
using Acceso_datos.Models;
using Acceso_datos.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductoService _productoService;

        public ProductController(ProductoService productoService)
        {
            _productoService = productoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> Get()
        {
            return await _productoService.ObtenerProductosAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetById(int id)
        {
            var producto = await _productoService.ObtenerProductoPorIdAsync(id);
            if (producto == null) return NotFound();
            return producto;
        }

        [HttpPost]
        public async Task<ActionResult<Producto>> Post(Producto producto)
        {
            var nuevo = await _productoService.CrearProductoAsync(producto);
            return CreatedAtAction(nameof(GetById), new { id = nuevo.Id }, nuevo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Producto producto)
        {
            var actualizado = await _productoService.ActualizarProductoAsync(id, producto);
            if (!actualizado) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var eliminado = await _productoService.EliminarProductoAsync(id);
            if (!eliminado) return NotFound();
            return NoContent();
        }

    }
}