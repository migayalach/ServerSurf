

// const { Resend } = require("resend");
// const { EMAIL_SEND } = process.env;

// const resendEmail = new Resend(EMAIL_SEND)  // ACA VA LA API KEY 
// const sendWelcomeEmail = async (
//   emailUser,
//   nameUser,
//   isGoogleRegistration = false
// ) => {
//     if (isGoogleRegistration) {
//       let email = emailUser.trim();
//       const { data, error } = await resendEmail.emails.send({
//         from: "Acme <onboarding@resend.dev>",
//         to: [email],
//         subject: "¡Bienvenido a Nuestro Sitio!",
//         html: `<p>Hola ${nameUser},</p><p>¡Bienvenido a nuestro sitio! Gracias por registrarte.</p>
//         <p>Esperamos que disfrutes de tu experiencia con nosotros.</p><p><a href="http://localhost:5173/">Ingresa aquí</a></p>
//         <p><a href="URL_PARA_CAMBIAR_CONTRASEÑA">Te invitamos a que por favor cambies tu contraseña, muchas gracias.</a></p>`
//       });
//       if (error) {
//         console.error("Error al enviar el correo de bienvenida:", error);
//       } else {
//         console.log("Correo de bienvenida enviado con éxito:", data);
//       }
//     } else {
//       const { data, error } = await resendEmail.emails.send({
//         from: "Acme <onboarding@resend.dev>",
//         to: [emailUser],
//         subject: "¡Bienvenido a Nuestro Sitio!",
//         html: `<p>Hola ${nameUser},</p><p>¡Bienvenido a nuestro sitio! Gracias por registrarte.</p>
//         <p>Esperamos que disfrutes de tu experiencia con nosotros.</p><p><a href="http://localhost:5173/">Ingresa aquí</a></p>`,
//       });
//       if (error) {
//         console.error("Error al enviar el correo de bienvenida:", error);
//       } else {
//         console.log("Correo de bienvenida enviado con éxito:", data);
//       }
//     }
// };

// const sendConfirmationEmail = async (emailUser, nameUser, idSale, costSale) => {
//   try {
//     const { data, error } = await resendEmail.emails.send({
//       from: "Acme <onboarding@resend.dev>",
//       to: [emailUser],
//       subject: "Confirmación de Compra",
//       html: `<p>Hola ${nameUser},</p><p>¡Gracias por tu compra!</p><p>Tu compra con se ha realizado con éxito.</p><p>Costo total: ${costSale}</p><p>¡Esperamos verte de nuevo pronto!</p>`,
//     });
//     if (error) {
//       console.error("Error al enviar el correo de confirmación de compra:", error.response.body);
//     } else {
//       console.log("Correo de confirmación de compra enviado con éxito:", data);
//     }
//   } catch (error) {
//     console.error("Error inesperado al enviar el correo de confirmación de compra:", error);
//   }
// };

// module.exports = {
//   resendEmail,
//   sendWelcomeEmail,
//   sendConfirmationEmail,
// };
const nodemailer = require('nodemailer');

// Configuración del transporte
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Puedes cambiarlo según el proveedor de correo
  auth: {
    user: 'laolaurbanaok@gmail.com', // Reemplaza con tu dirección de correo
    pass: 'pbem cvyt jlwe mpgx', // Reemplaza con tu contraseña
  },
}); 


const sendWelcomeEmail = async (emailUser, nameUser, isGoogleRegistration = false) => {
  try {
    const mailOptions = {
      from: 'laolaurbanaok@gmail.com',
      to: emailUser,
      subject: '¡Bienvenido a Nuestro Sitio!',
      html: `
        <p>Hola ${nameUser},</p>
        <p>¡Bienvenido a nuestro sitio! Gracias por registrarte.</p>
        <p>Esperamos que disfrutes de tu experiencia con nosotros.</p>
        ${isGoogleRegistration ? '<p>Disfruta de nustros productos.</p>' : ''}
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Correo de bienvenida enviado con éxito:', result);
  } catch (error) {
    console.error('Error al enviar el correo de bienvenida:', error);
  }
};


const sendConfirmationEmail = async (emailUser, nameUser, costSale) => {
  try {
    const mailOptions = {
      from: 'laolaurbanaok@gmail.com',
      to: emailUser,
      subject: 'Confirmación de Compra',
      html: `
        <p>Hola ${nameUser},</p>
        <p>¡Gracias por tu compra!</p>
        <p>Tu compra con se ha realizado con éxito.</p>
        <p>Costo total: ${costSale}</p>
        <p>¡Esperamos verte de nuevo pronto!</p>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Correo de confirmación de compra enviado con éxito:', result);
  } catch (error) {
    console.error('Error al enviar el correo de confirmación de compra:', error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendConfirmationEmail,
};

