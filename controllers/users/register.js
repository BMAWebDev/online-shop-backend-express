const { knex } = require('../../db');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const { codegen } = require('../../functions');

module.exports = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!lastName || !firstName || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Toate campurile sunt obligatorii' });
  }

  const passHash = bcrypt.hashSync(password);

  try {
    const generatedCode = codegen(6);

    const user = await knex('users').where({ email }).first();

    if (user)
      return res
        .status(500)
        .json({ message: 'Contul a fost deja inregistrat!' });

    await knex('users').insert({
      firstname: firstName,
      lastname: lastName,
      email,
      password: passHash,
      verification_code: generatedCode,
      verified: false,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bmihaiandrei@gmail.com',
        pass: 'docjqxrkayjytzgn',
      },
    });

    const clientServerURL =
      process.env.NODE_ENV == 'production'
        ? process.env.CLIENT_SERVER_URL
        : 'http://localhost:3000';

    var message = {
      from: 'bmihaiandrei@gmail.com',
      to: email,
      subject: 'Confirm Email',
      text: `Please confirm your email. Link to verify: ${clientServerURL}/verify-user/${generatedCode}`,
      html: `<p>Please confirm your email. Link to verify: <a href="${clientServerURL}/verify-user/${generatedCode}">click here</a>.</p>`,
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });

    return res.status(200).json({
      message:
        'Inregistrarea a fost efectuata. Te rugam sa iti confirmi mailul pentru a iti putea folosi contul!',
    });
  } catch (err) {
    console.log(err, 3);
    return res
      .status(500)
      .json({ message: 'Inregistrarea nu s-a putut efectua' });
  }
};
