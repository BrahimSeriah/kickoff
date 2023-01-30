require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = () =>  {
  mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connectDB;