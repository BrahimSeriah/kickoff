const express = require('express');
const Match = require('../models/match');
const Club = require('../models/club');
const Goal = require('../models/goal');
const YellowCard = require('../models/yellowCard');
const RedCard = require('../models/redCard');


const router = express.Router();

router.get('/', (req, res) => {
    Match.find({}, (err, data) => {
        res.status(200).send(data);
    })
});

router.get('/:id', (req, res) => {
    Match.findById(req.params.id, (err, data) => {
        res.status(200).send(data);
    });
});

router.post('/', (req, res) => {
    Match.insertMany([new Match({
        club1_id : req.body.club1_id,
        club2_id : req.body.club2_id
    })], (err) => {
        if (!err)
            res.status(200).send('match added');
    });
});

router.put('/:id', (req, res) => {
    Match.findByIdAndUpdate(req.params.id, {
        club1_score: req.body.club1_score,
        club2_score: req.body.club2_score,
        isPlayed: true
    }, (err, data) => {
        if (req.body.club1_score > req.body.club2_score) {
            Club.findByIdAndUpdate(data.club1_id, {
                $inc: {points: 3, wins: 1}
            }).exec();
            Club.findByIdAndUpdate(data.club2_id, {
                $inc: {losses: 1}
            }).exec();
        }
        if (req.body.club2_score > req.body.club1_score) {
            Club.findByIdAndUpdate(data.club2_id, {
                $inc: {points: 3, wins: 1}
            }).exec();
            Club.findByIdAndUpdate(data.club1_id, {
                $inc: {losses: 1}
            }).exec();
        }
        if (req.body.club1_score === req.body.club2_score) {
            Club.findByIdAndUpdate(data.club1_id, {
                $inc: {points: 1, draws: 1}
            }).exec();
            Club.findByIdAndUpdate(data.club2_id, {
                $inc: {points: 1, draws: 1}
            }).exec();
        }
        Club.findByIdAndUpdate(data.club1_id, {
            $inc: {playedMatches: 1, goalsFor: req.body.club1_score, goalsAgainst: req.body.club2_score}
        }).exec();
        Club.findByIdAndUpdate(data.club2_id, {
            $inc: {playedMatches: 1, goalsFor: req.body.club2_score, goalsAgainst: req.body.club1_score}
        }).exec();
    });
    Goal.insertMany(req.body.goals, (err, data) => {
        if(err)
            console.log(err);
    });
    YellowCard.insertMany(req.body.yellowCards, (err, data) => {
        if(err)
            console.log(err);
    });
    RedCard.insertMany(req.body.redCards, (err, data) => {
        if(err)
            console.log(err);
    });
    res.status(200).send('Updated');
});


module.exports = router;