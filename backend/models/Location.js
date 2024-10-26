const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    subcategory: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    photo: [{
      type: String,
      required: true,
    }],
    desc: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    avgRating: {
      type: String,
      required: true,
    },

    recommended: {
      type: Boolean,
      default: false,
    },
    lng: {
      type: Number,
      required: false,
    },
    lat: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Location', locationSchema);
