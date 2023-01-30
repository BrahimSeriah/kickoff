const mongoose = require('mongoose')

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
        default: 'defaultLogo.jpg'
    }
});
    
module.exports = mongoose.model("Club", clubSchema);