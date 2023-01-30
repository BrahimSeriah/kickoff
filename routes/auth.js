const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const router = express.Router();

router.post('/club', (req, res) => {
    console.log(req.body);
});

router.post('/admin', (req, res) => {
});

module.exports = router;