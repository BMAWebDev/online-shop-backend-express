const { knex } = require('../../db');

module.exports = async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ message: 'Codul este obligatoriu' });

  try {
    const user = await knex('users').where({ verification_code: code }).first();

    if (!user) return res.status(400).json({ message: 'Codul nu este valid' });

    if (user.verified)
      return res.status(400).json({ message: 'Codul a fost deja validat' });

    await knex('users')
      .update({
        verified: true,
      })
      .where({ verification_code: code });

    return res.status(200).json({
      message: 'Contul a fost verificat. Mult succes!',
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Verificarea nu a putut fi efectuata' });
  }
};
