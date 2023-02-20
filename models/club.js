const mongoose = require('mongoose');

const clubSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true,
    },
    logoPath: {
        type: String,
        default: 'defaultLogo.png'
    },
    points: {
        type: Number,
        default: 0
    },
    playedMatches: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    draws: {
        type: Number,
        default: 0,
    },
    goalsFor: {
        type: Number,
        default: 0
    },
    goalsAgainst: {
        type: Number,
        default: 0
    }
});

const ClubModel = mongoose.model("club", clubSchema);

module.exports = ClubModel;