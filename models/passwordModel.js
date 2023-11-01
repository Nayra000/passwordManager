require('dotenv').config();
const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

const encryptPassword = require('../utils/encryptPassword');
const decryptPassword = require('../utils/decryptPassword');

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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    /* required:[true, 'The password must belong to a user'] */
  },
});

passwordSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  encryptPassword(this);

  next();
});

passwordSchema.post(/^find/, async function (docs, next) {
  if (!this.password) next();

  docs.forEach((element) => {
    decryptPassword(element);

    element.cipheriv = undefined;
    element.password = undefined;
  });

  next();
});

module.exports = mongoose.model('Password', passwordSchema);
