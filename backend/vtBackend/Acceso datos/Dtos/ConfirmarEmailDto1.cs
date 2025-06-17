using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Acceso_datos.Dtos
{
    public class ConfirmarEmailDto
    {
        public string Email { get; set; } = string.Empty;
        public string Codigo { get; set; } = string.Empty;
    }

}
