using System;
using System.Collections.Generic;

namespace Acceso_datos.Models;

public partial class ItemsPedido
{
    public int Id { get; set; }

    public int PedidoId { get; set; }

    public int ProductoId { get; set; }

    public int Cantidad { get; set; }

    public decimal PrecioUnitario { get; set; }

    public virtual Pedido Pedido { get; set; } = null!;

    public virtual Personalizacione? Personalizacione { get; set; }

    public virtual Producto Producto { get; set; } = null!;
}
