const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      default: 'all'
    },
    subcategory: {
      type: String,
      default: 'all'
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },

    photo: [{
      type: String,
    }],

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
