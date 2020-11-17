const mongoose = require('mongoose');
const regex = require('../utils/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regex.url.test(v);
      },
      message: 'Неверный формат ссылки',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
