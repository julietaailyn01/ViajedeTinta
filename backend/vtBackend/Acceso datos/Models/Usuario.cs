using System;
using System.Collections.Generic;

namespace Acceso_datos.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public RolUsuario Rol { get; set; } = RolUsuario.Cliente;

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();

    public bool EmailVerificado { get; set; } = false;

    public string? CodigoVerificacion { get; set; }
}

