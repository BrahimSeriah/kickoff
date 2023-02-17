const express = require('express');
const Player = require('../models/player')

const router = express.Router();

router.get('/', (req, res) => {
    Player.find((err, data) => {
        res.status(200).send(data);
    });
});

router.post('/', (req, res) => {
    Player.insertMany([new Player({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        position: req.body.position,
        number: req.body.number,
        club_id: req.header('Authorization').split(' ')[2]
    })], (err) => {
        if(!err) {
            res.status(200).json({
                message: 'Player inserted' 
            })
        }
        else {
            res.status(500).json(err)
        }
    });
});

router.put('/:id', (req, res) => {
    Player.findByIdAndUpdate(req.params.id, req.body ,{new: true}, (err, data) => {
        res.status(200).send(data);
    })
});

router.delete('/:id', (req, res) => {
    Player.findById(req.params.id).exec((err, data) => {       
        if (data.club_id.toString() === req.header('Authorization').split(' ')[2]) {
            Player.deleteOne({_id: data._id}, (err) => {
                if(!err)
                    res.status(200).send('Player Deleted');
                else console.log(err);
            });
        }
    })
})

module.exports = router;