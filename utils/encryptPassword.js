const crypto = require('crypto');

module.exports = (doc) => {
  doc.cipheriv = crypto.randomBytes(16);

  const key = Buffer.from(process.env.CIPHER_SECRET_KEY, 'hex').toString(
    'base64',
  );

  const cipher = crypto.createCipheriv('aes-256-cbc', key, doc.cipheriv);

  doc.password = cipher.update(doc.password, 'utf-8', 'hex');
  doc.password += cipher.final('hex');

  doc.passwordChangedAt = Date.now();
};
