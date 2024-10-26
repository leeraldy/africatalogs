const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    subcategory: {
      type: String,
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
    recommended: {
      type: Boolean,
      default: false,
    },
    avgRating: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
