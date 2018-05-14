const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    start: { type: Number, required: true },
    duration: {
      type: Number,
      required: true,
      validate(duration) {
        return this.start + duration <= 540;
      }
    },
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Event', EventSchema);
