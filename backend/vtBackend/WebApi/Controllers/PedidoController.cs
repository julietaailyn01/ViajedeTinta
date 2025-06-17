using Acceso_datos.Models;
using Acceso_datos.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidoController : ControllerBase
    {
        private readonly PedidoService _pedidoService;

        public PedidoController(PedidoService pedidoService)
        {
            _pedidoService = pedidoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pedido>>> Get() => await _pedidoService.ObtenerPedidosAsync();

        [HttpPost]
        public async Task<ActionResult<Pedido>> Post(Pedido pedido)
        {
            var nuevo = await _pedidoService.CrearPedidoAsync(pedido);
            return CreatedAtAction(nameof(Get), new { id = nuevo.Id }, nuevo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string nuevoEstado)
        {
            var actualizado = await _pedidoService.ActualizarEstadoPedidoAsync(id, nuevoEstado);
            if (!actualizado) return NotFound();
            return NoContent();
        }

    }
}
