const express = require('express')
const cors = require('cors')
const connectDB = require("./config/db");
const bodyParser = require('body-parser');

const Match = require('./models/match');
const Club = require('./models/club');

require('dotenv').config();

const app = express()
connectDB();

app.use(bodyParser.json()) 
app.use(cors())

app.use('/api/club', require('./routes/club'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/player', require('./routes/player'));

app.get('/api/images/:path', (req, res) => {
    res.sendFile(__dirname + '/public/images/' + req.params.path);
});

app.post('/api/match', (req, res) => {
    Match.insertMany([new Match({
        club1_id : req.body.club1_id,
        club2_id : req.body.club2_id
    })], (err) => {
        if (!err)
            res.status(200);
    });
});


app.listen(process.env.PORT, () => {
    console.log(`App is listening at http://localhost:${process.env.PORT}`)
})