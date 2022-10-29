var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        lowercase: true,
    },
    lastname: {
        type: String,
        lowercase: true,
    },
    code: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true        
    },
    password: {
        type: String,
        required: true
    },
    remember_token: {
        type: String
    },
    amount: {
        type: Number,
        default: 20
    },
    gender: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);