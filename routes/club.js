const express = require('express');
const Club = require('../models/club')

const router = express.Router(); 

router.post('/', (req, res) => {
    Club.insertMany([new Club({
        name: req.body.name,
        password: req.body.password
    })], (err) => {
        if(!err) {
            res.status(200).json({
                message: 'Club inserted' 
            })
        }
        else {
            res.status(500).json(err)
        }
    })
});

router.get('/', (req, res) => {
    Club.find({},{name: 1}, (err, data) => {
        if(!err)
            res.status(200).json(data)
        else 
            res.status(500).json(err)
    })
})

module.exports = router