const mongoose = require('mongoose');

const yellowCardSchema = new mongoose.Schema({
    player_id : {
        type: mongoose.Types.ObjectId, 
        ref: "player"
    },
    match_id : {
        type: mongoose.Types.ObjectId,
        ref: 'match'
    }
});

const yellowCardModel = mongoose.model("yellowCard", yellowCardSchema);

module.exports = yellowCardModel;