var mongoose = require('mongoose'),
auto = require('mongoose-plugin-autoinc');
const { Schema } = mongoose;

var userBuySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    item_id: {
        type: String,
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
    price: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

userBuySchema.plugin(auto.autoIncrement,{
    model: 'userBuy',
    startAt: 1,
    incrementBy: 1 
});

module.exports = mongoose.model('userBuy', userBuySchema);