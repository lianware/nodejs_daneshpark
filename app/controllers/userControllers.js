var bcrypt = require('bcrypt'),
  User = require('../models/userModel.js'),
  persianDate = require('persian-date');

exports.authenticate = function(req, res) {
  User.findOne({email: req.body.email}, function(err, user){
    if(err) throw err;
    if(!req.body.password){
      return res.status(401).json({message: 'رمز عبور خود را وارد نمایید', error: true});
    }
    if(!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({message: 'نام کاربری یا رمز عبور شما نادرست می باشد', error: true});
    }
    token = user.remember_token;
    user.remember_token = undefined;
    user.password = undefined;
    return res.json({token: token, userinfo: user});
  });
};

exports.register = function(req, res) {
    req.body.created = new persianDate(new Date((new Date()).toLocaleString("en-US", {timeZone: "Asia/Tehran"}))).format("LLLL");
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    if(!newUser.validateSync()){    
        newUser.save(function(err, user) {
          if(err) throw(err);
          user.password = undefined;
          user.remember_token = undefined;
          return res.json({result: user});
        });
    } else {
        return res.status(400).json({message: newUser.validateSync().message, error: true});
    }
  };
  