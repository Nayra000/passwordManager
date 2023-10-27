require('dotenv').config();
const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const crypto = require('crypto');

const passwordSchema = new mongoose.Schema({
  hubName: {
    type: String,
    required: [
      true,
      'Provide a name for the Hub you need to save the password for.',
    ],
    minlength: [5, 'Hub name must be at least 5 characters'],
    maxlength: [15, 'Hub name must be at most 15 characters'],
  },
  email: {
    type: String,
    lowercase: true,
    validate: {
      validator: isEmail,
      message: 'Enter a valid email',
    },
  },
  password: {
    type: String,
    required: [true, `Provide a password for ${this.hubName} account`],
  },
  passwordChangedAt: {
    // to track when you set this password or changed
    type: Date,
  },
  cipheriv: {
    type: Buffer,
  },
  hubPassword: {
    type: String,
  },
});

passwordSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.cipheriv = crypto.randomBytes(16);

  const key = Buffer.from(process.env.CIPHER_SECRET_KEY, 'hex').toString(
    'base64',
  );

  const cipher = crypto.createCipheriv('aes-256-cbc', key, this.cipheriv);

  this.password = cipher.update(this.password, 'utf-8', 'hex');
  this.password += cipher.final('hex');

  this.passwordChangedAt = Date.now();

  next();
});

passwordSchema.post(/^find/, async function (docs, next) {
  if (!this.password) next();

  docs.forEach((element) => {
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

    element.cipheriv = undefined;
    element.password = undefined;
  });

  next();
});

module.exports = mongoose.model('Password', passwordSchema);
