const crypto = require('crypto');

module.exports = (element) => {
  const key = Buffer.from(process.env.CIPHER_SECRET_KEY, 'hex').toString(
    'base64',
  );

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    key,
    element.cipheriv,
  );

  element.hubPassword = decipher.update(element.password, 'hex', 'utf-8');
  element.hubPassword += decipher.final('utf-8');
};
