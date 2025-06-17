using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace Acceso_datos.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task EnviarEmailAsync(string destino, string asunto, string cuerpoHtml)
        {
            var mensaje = new MimeMessage();
            mensaje.From.Add(new MailboxAddress(_config["Smtp:NombreRemitente"], _config["Smtp:From"]));
            mensaje.To.Add(MailboxAddress.Parse(destino));
            mensaje.Subject = asunto;

            mensaje.Body = new TextPart("html")
            {
                Text = cuerpoHtml
            };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_config["Smtp:Host"], int.Parse(_config["Smtp:Port"]), SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_config["Smtp:From"], _config["Smtp:Password"]);
            await smtp.SendAsync(mensaje);
            await smtp.DisconnectAsync(true);
        }
    }
}
