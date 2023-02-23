const authMiddleware = require('../middlewares/auth');
const express = require('express');
const multer = require('multer');
const path = require('path')
const Club = require('../models/club');
const Player = require('../models/player');

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
            cb(null, 'logo-' + req.params.id + path.extname(file.originalname))
        }
    })
})

router.post('/', async (req, res) => {
    Club.insertMany([new Club({
        name: req.body.name,
        password: req.body.password
    })], (err) => {
        if (!err) {
            res.status(200).json({
                message: 'Club inserted'
            })
        }
        else {
            res.status(500).json(err)
        }
    })
});

router.delete('/', (req, res) => {
    if (authMiddleware.isUserAdmine(req.header('Authorization').split(' ')[1])) {
        Club.deleteOne({ _id: req.body.id }, (err, data) => {
            res.status(200).send('Item Deleted');
        })
    }
});

router.get('/admin', (req, res) => {
    if (authMiddleware.isUserAdmine(req.header('Authorization').split(' ')[1])) {
        Club.find({}, (err, data) => {
            if (!err)
                res.status(200).json(data)
        })
    }
});

router.get('/', (req, res) => {
    Club.find({}, { password: 0 }, (err, data) => {
        if (!err)
            res.status(200).json(data)
        else
            res.status(500).json(err)
    })
});

router.get('/standings', (req, res) => {
    Club.find({}, { password: 0 })
        .sort({points: -1, playerMatches: 1, goalsFor: -1})
        .then((data) => { res.status(200).json(data) })
        .catch((err) => { res.status(500).json(err) });      
});

router.get('/:id', (req, res) => {
    Club.findById(req.params.id).exec((err, data) => {
        res.status(200).send(data)
    });
});

router.put('/:id', (req, res) => {
    Club.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, data) => {
        res.status(200).send(data)
    })
})

router.get('/:id/players', (req, res) => {
    Player.find({ club_id: req.params.id }, (err, data) => {
        res.status(200).send(data)
    });
});

router.post('/:id/upload', upload.single('logo'), (req, res) => {
    try {
        Club.findByIdAndUpdate(req.params.id, {logoPath: req.file.filename }, {new: true}).exec((err, data) => {
        });
        res.send('Image uploaded successfully');
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router