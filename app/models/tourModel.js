var mongoose = require('mongoose');

var tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    capacity_min: {
        type: Number,
        required: true
    },
    capacity_max: {
        type: Number,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Tour', tourSchema);