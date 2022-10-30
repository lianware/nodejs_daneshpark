var mongoose = require('mongoose'),
auto = require('mongoose-plugin-autoinc');
const { Schema } = mongoose;

var userBuySchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    item_id: {
        type: Schema.Types.ObjectId,
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