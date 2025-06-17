using System;
using System.Collections.Generic;

namespace Acceso_datos.Models;

public partial class Personalizacione
{
    public int Id { get; set; }

    public int ItemPedidoId { get; set; }

    public string ImagenCliente { get; set; } = null!;

    public string? MockupGenerado { get; set; }

    public virtual ItemsPedido ItemPedido { get; set; } = null!;
}
