var mongoose = require('mongoose'),
persianDate = require('persian-date'),
auto = require('mongoose-plugin-autoinc'),
dotenv = require('dotenv'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt');
const { Schema } = mongoose;


dotenv.config();
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    birthday: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    phone: {
        type: Number,
        trim: true
    },
    code: {
        type: String,
        unique: true,
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
        type: String,
        default: jwt.sign({email: this.email, password: this.password}, process.env.JWT_SECRET_KEY)
    },
    amount: {
        type: Number,
        default: 20
    },
    created: {
        type: String,
    }
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(auto.autoIncrement,{
    model: 'User',
    startAt: 1003,
    incrementBy: 20
});

module.exports = mongoose.model('User', userSchema);