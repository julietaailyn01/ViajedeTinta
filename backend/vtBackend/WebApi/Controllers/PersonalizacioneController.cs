using Acceso_datos.Models;
using Acceso_datos.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonalizacionController : ControllerBase
    {
        private readonly PersonalizacionService _personalizacionService;

        public PersonalizacionController(PersonalizacionService personalizacionService)
        {
            _personalizacionService = personalizacionService;
        }

        [HttpGet("item/{itemId}")]
        public async Task<ActionResult<Personalizacione>> GetByItemId(int itemId)
        {
            var p = await _personalizacionService.ObtenerPorItemPedidoIdAsync(itemId);
            if (p == null) return NotFound();
            return p;
        }

        [HttpPost]
        public async Task<ActionResult<Personalizacione>> Post(Personalizacione personalizacion)
        {
            var nueva = await _personalizacionService.CrearPersonalizacionAsync(personalizacion);
            return CreatedAtAction(nameof(GetByItemId), new { itemId = nueva.ItemPedidoId }, nueva);
        }
    }
}
