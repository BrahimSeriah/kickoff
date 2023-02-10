const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  club_id: {
    type: mongoose.Types.ObjectId, 
    ref: "club"
  },
  yellow_cards: {
    type: 'number',
    default: 0
  },
  red_card: {
    type: 'number',
    default: 0
  }
});

module.exports = mongoose.model('player', playerSchema);