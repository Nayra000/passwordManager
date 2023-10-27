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
    select: false,
  },
  passwordChangedAt: {
    // to track when you set this password or changed
    type: Date,
  },
  cipheriv: {
    type: String,
    select: false,
  },
  hubPassword: {
    type: String,
    select: false,
    default: 'none',
  },
});

passwordSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.cipheriv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    process.env.CIPHER_SECRET_KEY,
    this.cipheriv,
  );

  this.password = cipher.update(this.password, 'utf-8', 'hex');
  this.password += cipher.final('hex');

  this.passwordChangedAt = Date.now();

  next();
});

passwordSchema.post(/^find/, function (docs, next) {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    process.env.CIPHER_SECRET_KEY,
    this.cipheriv,
  );

  this.decryptedPassword = decipher.update(this.password, 'hex', 'utf-8');
  this.decryptedPassword += decipher.final('utf-8');

  // console.log(this.decryptedPassword); // This is a secret message

  next();
});

module.exports = mongoose.model('Password', passwordSchema);
