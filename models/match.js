const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    club1_id: {
        type: mongoose.Types.ObjectId,
        ref: 'club'
    },
    club2_id: {
        type: mongoose.Types.ObjectId,
        ref: 'club'
    },
    club1_score: {
        type: Number,
        default: 0
    },
    club2_score: {
        type: Number,
        default: 0
    }
});

const matchModel = mongoose.model('match', matchSchema);

module.exports = matchModel;