const mongoose = require('mpngoose');

const goalSchema = new mongoose.Schema({
    player_id : {
        type: mongoose.Types.ObjectId, 
        ref: "player"
    },
    match_id : {
        type: mongoose.Types.ObjectId,
        ref: 'match'
    }
});

const goalModel = mongoose.model("goal", goalSchema);

module.exports = goalModel;