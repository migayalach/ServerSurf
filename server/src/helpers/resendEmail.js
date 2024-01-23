const { Resend } = require("resend");

const resendEmail = new Resend('re_WtQ66vUE_2i11ZJLnH5LUzDN7pKVTEdKc')  // ACA VA LA API KEY ESTA ES DE MATIAS 
const sendWelcomeEmail = async (
  emailUser,
  nameUser,
  isGoogleRegistration = false
) => {
  try {
    let welcomeMessage = `<p>Hola ${nameUser},</p><p>¡Bienvenido a nuestro sitio! Gracias por registrarte.</p><p>Esperamos que disfrutes de tu experiencia con nosotros.</p>`;

    if (isGoogleRegistration) {
      // Incluir enlace para cambiar contraseña específico para Google
      welcomeMessage += `<p><a href="URL_PARA_CAMBIAR_CONTRASEÑA">Cambiar contraseña</a></p>`;
    }

    const { data, error } = await resendEmail.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [emailUser],
      subject: "¡Bienvenido a Nuestro Sitio!",
      html: `<p>Hola ${nameUser},</p><p>¡Bienvenido a nuestro sitio! Gracias por registrarte.</p><p>Esperamos que disfrutes de tu experiencia con nosotros.</p><p><a href="http://localhost:5173/">Ingresa aquí</a></p>`,
    });

    if (error) {
      console.error("Error al enviar el correo de bienvenida:", error);
    } else {
      console.log("Correo de bienvenida enviado con éxito:", data);
    }
  } catch (error) {
    console.error("Error inesperado al enviar el correo de bienvenida:", error);
  }
};

const sendConfirmationEmail = async (emailUser, nameUser, idSale, costSale) => {
  try {
    const { data, error } = await resendEmail.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [emailUser],
      subject: "Confirmación de Compra",
      html: `<p>Hola ${nameUser},</p><p>¡Gracias por tu compra!</p><p>Tu compra con el ID ${idSale} se ha realizado con éxito.</p><p>Costo total: ${costSale}</p><p>¡Esperamos verte de nuevo pronto!</p>`,
    });
    if (error) {
      console.error("Error al enviar el correo de confirmación de compra:", error.response.body);
    } else {
      console.log("Correo de confirmación de compra enviado con éxito:", data);
    }
  } catch (error) {
    console.error("Error inesperado al enviar el correo de confirmación de compra:", error);
  }
};

module.exports = {
  resendEmail,
  sendWelcomeEmail,
  sendConfirmationEmail,
};
