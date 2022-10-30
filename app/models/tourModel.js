var mongoose = require('mongoose');
const { Schema } = mongoose;

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
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    capacity_min: {
        type: Number,
    },
    capacity_max: {
        type: Number,
    },
    organizer: {
        type: String,
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