var Book = require('../models/bookModel.js'),
  User = require('../models/userModel.js');
  Tour = require('../models/tourModel.js'),
  userBuy = require('../models/userBuyModel.js'),
  persianDate = require('persian-date');


exports.addTour = function(req, res) {
    var newTour = new Tour(req.body);
    newTour.save(function(err, tour){
        if(err) throw(err);
        return res.json({tour});
    });
};

exports.buyTour = function(req, res) {
    User.findOne({remember_token: req.query.token}, function(err, user){
        if(err) throw(err);
        Tour.findOne({_id: req.query.id}, function(err, tour){
            if(err) throw(err);
            var newUserBuy = new userBuy({user_id: user._id, item_id: tour._id, name: tour.name, state: 1, amount: tour.price, date: new persianDate().format("LLLL")});
            newUserBuy.save(function(err, res){
                if(err) throw(err);
            });
            return res.json({user_id: user._id, item_id: tour._id, name: tour.name, category: "خرید تور آموزشی", amount: tour.price, date: new persianDate().format("LLLL")});
        });
    }); 
};

exports.getTour = function(req, res) {
    Tour.findOne({_id: req.query.id}, function(err, tour){
        if(err) throw(err);
        return res.json({tour});
    });
};

exports.getTours = function(req, res) {
    Tour.find({}, function(err, tours){
        if(err) throw(err);
        return res.json({tours});
    });
};