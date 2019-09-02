const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
});

const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // reference to another obj stored inside MongoDB
        ref: 'User' // indicates the UserID is being at an instance of a user
    },
    name: {
        type: String,
        default: ''
    },
    locations: [pointSchema]
});

mongoose.model('Track', trackSchema); // not loading pointSchema b/c it's embedded with trackSchema