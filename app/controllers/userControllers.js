var bcrypt = require('bcrypt'),
  User = require('../models/userModel.js');

exports.authenticate = function(req, res) {
  User.findOne({email: req.body.email}, function(err, user){
    if(err) throw err;
    if(!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    token = user.remember_token;
    user.remember_token = undefined;
    user.password = undefined;
    return res.json({token: token, userinfo: user});
  });
};

exports.register = function(req, res) {
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if(err) throw(err);
      user.password = undefined;
      user.remember_token = undefined;
      return res.json(user);
    });
  };
  