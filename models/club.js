const mongoose = require('mongoose');

const clubSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    }
});

const ClubModel = mongoose.model("club", clubSchema);

module.exports = ClubModel;