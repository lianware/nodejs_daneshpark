var mongoose = require('mongoose'),
auto = require('mongoose-plugin-autoinc');
const { Schema } = mongoose;

var userBookSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    book_id: {
        type: String,
        required: true
    },
});

userBookSchema.plugin(auto.autoIncrement,{
    model: 'userBook',
    startAt: 1,
    incrementBy: 1 
});

module.exports = mongoose.model('userBook', userBookSchema);