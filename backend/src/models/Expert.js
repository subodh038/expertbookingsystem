const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 4
  },
  availableSlots: [
    {
      date: {
        type: String, // "2026-02-22"
        required: true
      },
      slots: [
        {
          type: String // "10:00 AM"
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Expert", expertSchema);