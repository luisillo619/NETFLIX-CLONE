import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.NODEMAILER,
  },
});

const mailWelcome = (email) => {
  return {
    from: process.env.EMAIL,
    to: email,
    subject: "¡Bienvenido a Wancayo Sabor Peruano!",
    html: `
      <p>Te damos la bienvenida a nuestra familia Wancayo</p>
      <br />
      <p><b>Nos encontramos muy felices de que desees hacer parte de nuestra familia.</b></p>
      <p>Contamos con una amplia gama de productos cosechados de nuestra pachamama para ti, queremos ser sinónimo de calidad y excelentes precios.</p>
    `,
  };
};

const mailDelete = (email) => {
  return {
    from: process.env.EMAIL,
    to: email,
    subject: "¡Wancayito espera tu regreso!",
    html: `
      <p>Es para nosotros una pena de que decidas eliminar tu cuenta, pero vuelve cuando lo desees, estaremos con los brazos abiertos para recibirte de nuevo, hasta pronto...</p>
      <br />
      <p><b>Muchos éxitos!!!</b></p>
    `,
  };
};

const mailNewPassword = (email, link) => {
  return {
    from: process.env.EMAIL,
    to: email,
    subject: "Nueva contraseña",
    html: `
      <p>Este es tu correo de solicitud de cambio de contraseña.</p>
      <br />
      <p><b>Da click en el siguiente enlace.</b></p>
      <br />
      <a href=${link} ><b>LINK</b></a>
    `,
  };
};

// RUTA QUE VA A MANDAR EL MENSAJE AL USUARIO
export default function handler(req, res) {
  const { email } = req.body;
  try {
    const mailOptions = mailWelcome(email);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(200).send(`Correo electrónico enviado: ${info.response}`);
      } else {
        res.status(201).send(`Correo electrónico enviado: ${info.response}`);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(`Correo electrónico enviado: ${info.response}`);
  }
}
