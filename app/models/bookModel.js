var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true        
    },
    status: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default: 20
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', bookSchema);