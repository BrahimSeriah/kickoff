import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    enum: ['GK', 'CB', 'RB', 'LB', 'DMF', 'CMF', 'RMF', 'LMF', 'AMF', 'RWF', 'LWF', 'SS', 'CF']
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  club: {
    type: {type: mongoose.Types.ObjectId, ref: "Club"}
  }
});

module.exports = mongoose.model('Player', playerSchema);