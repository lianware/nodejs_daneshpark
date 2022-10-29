var mongoose = require('mongoose');
const { Schema } = mongoose;

var userBookSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    book_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
});

module.exports = mongoose.model('userBook', userBookSchema);