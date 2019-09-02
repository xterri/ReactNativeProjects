const express = require('express');
const mongoose = require('mongoose');

// ensure user is signed in
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

// all req handler used in this file, requires user to be signed in

router.use(requireAuth);

// allow user access/to get all their created tracks
router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id });

    res.send(tracks); // returns an array of saved tracks; empty array if nothing returned
});

router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;

    if (!name || !locations) {
        return res
            .status(422)
            .send({ error: 'You must provide a name and the locations '});
    }

    try {
        const track = new Track({ name, locations, userId: req.user._id });

        await track.save();
    
        res.send(track);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }

});

module.exports = router;