const express = require('express')
const cors = require('cors')
const connectDB = require("./config/db");
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express()
connectDB();

app.use(bodyParser.json()) 
app.use(cors())

app.use('/api/club', require('./routes/club'));
app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log(`App is listening at http://localhost:${process.env.PORT}`)
})