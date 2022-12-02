var mongoose = require('mongoose'),
auto = require('mongoose-plugin-autoinc');
const { Schema } = mongoose;

var userChargeSchema = new mongoose.Schema({
    authority: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    ref_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
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

userChargeSchema.plugin(auto.autoIncrement,{
    model: 'userCharge',
    startAt: 1,
    incrementBy: 1 
});

module.exports = mongoose.model('userCharge', userChargeSchema);