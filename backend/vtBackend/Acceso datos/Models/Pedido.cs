using System;
using System.Collections.Generic;

namespace Acceso_datos.Models;

public partial class Pedido
{
    public int Id { get; set; }

    public int UsuarioId { get; set; }

    public DateTime Fecha { get; set; }

    public decimal Total { get; set; }

    public string Estado { get; set; } = null!;

    public virtual ICollection<ItemsPedido> ItemsPedidos { get; set; } = new List<ItemsPedido>();

    public virtual Usuario Usuario { get; set; } = null!;
}
