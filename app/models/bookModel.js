var mongoose = require('mongoose'),
auto = require('mongoose-plugin-autoinc'),
persianDate = require('persian-date');
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
        type: String,
        default: new persianDate().format("L")
    }
});

bookSchema.plugin(auto.autoIncrement,{
    model: 'Book',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Book', bookSchema);