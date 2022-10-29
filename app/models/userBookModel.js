var mongoose = require('mongoose');

var userBookSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    book_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
});

module.exports = mongoose.model('userBook', userBookSchema);