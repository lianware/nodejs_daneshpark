var mongoose = require('mongoose');
const { Schema } = mongoose;

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
        type: Schema.Types.ObjectId,
        required: true        
    },
    status: {
        type: Number,
        default: 0
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