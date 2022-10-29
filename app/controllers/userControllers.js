var jwt = require('jsonwebtoken'),
  dotenv = require('dotenv'),
  bcrypt = require('bcrypt'),
  User = require('../models/userModel.js');

exports.authenticate = function(req, res) {
  dotenv.config();
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    user.password = undefined;
    user.remember_token = undefined;
    return res.json({ token: jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET_KEY), userinfo: user});
  });
};

exports.register = function(req, res) {
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) throw(err);
      user.password = undefined;
      user.remember_token = undefined;
      return res.json(user);
    });
  };
  