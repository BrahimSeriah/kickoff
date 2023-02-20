const mongoose = require('mongoose');

const redCardSchema = new mongoose.Schema({
    player_id : {
        type: mongoose.Types.ObjectId, 
        ref: "player"
    },
    match_id : {
        type: mongoose.Types.ObjectId,
        ref: 'match'
    }
});

const redCardModel = mongoose.model("redCard", redCardSchema);

module.exports = redCardModel;