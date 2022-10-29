var mongoose = require('mongoose');

var userBuySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    item_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('userBuy', userBuySchema);