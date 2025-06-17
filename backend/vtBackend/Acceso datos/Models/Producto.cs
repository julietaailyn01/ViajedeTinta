using System;
using System.Collections.Generic;

namespace Acceso_datos.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public decimal Precio { get; set; }

    public string Categoria { get; set; } = null!;

    public string ImagenUrl { get; set; } = null!;

    public bool Personalizable { get; set; }

    public virtual ICollection<ItemsPedido> ItemsPedidos { get; set; } = new List<ItemsPedido>();
}
