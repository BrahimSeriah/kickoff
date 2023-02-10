const express = require('express');
const jwt = require('jsonwebtoken');
const Club = require('../models/club');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/club',async (req, res) => {
    Club.findById(req.body.clubId, (err, data) => {
        if (data.password === req.body.password) {
            const payload = {
                clubId: data._id
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1w'});
            res.status(200).json({
                token: token,
                clubId: data._id
            });
        }
    
    });
});

router.post('/admin', (req, res) => {
    if (req.body.password === process.env.ADMIN_PASSWORD){
        const payload = {
            isAdmin: true
        }
        const token = jwt.sign(
            payload, process.env.JWT_SECRET, {expiresIn: '1w'}
        );
        res.status(200).json({
            token: token
        });
    }
});

router.post('/isUserAdmin', (req, res) => {
    const token = jwt.decode(req.body.jwt, process.env.JWT_SECRET);
    res.send(token.isAdmin);
});

router.post('/verifyToken', (req, res) => {
    res.send(jwt.verify(req.body.jwt, process.env.JWT_SECRET));
});

module.exports = router;