var Book = require('../models/bookModel.js'),
  User = require('../models/userModel.js');
  Tour = require('../models/tourModel.js'),
  userBuy = require('../models/userBuyModel.js'),
  persianDate = require('persian-date');


exports.addTour = function(req, res) {
    var newTour = new Tour(req.body);
    if(!newTour.validateSync()){
        newTour.save(function(err, tour){
            if(err) throw(err);
            return res.json({result: tour});
        });
    } else {
        return res.status(400).json({message: newTour.validateSync().message, error: true});
    }
};

exports.buyTour = function(req, res) {
    User.findOne({remember_token: req.query.token}, function(err, user){
        if(err) throw(err);
        if(!user){
            return res.status(401).json({message: "توکن وارد شده نامعتبر است", error: true});
        }
        userBuy.findOne({$and: [{user_id: user._id}, {item_id: req.query.id}]}, function(err, uBuy){
            if(err) throw(err);
            if(uBuy){
                return res.status(400).json({message: "این تور قبلا توسط شما خریداری شده است", error: true});   
            } else {
                Tour.findOne({_id: req.query.id}, function(err, tour){
                    if(err) throw(err);
                    if(!tour){
                        return res.status(400).json({message: "شناسه وارد شده نامعتبر است", error: true});
                    }            
                    if(user.amount >= tour.price){
                        user.amount -= tour.price;
                        var newUserBuy = new userBuy({user_id: user._id, item_id: tour._id, name: tour.name, state: 1, price: tour.price, date: new persianDate().format("LLLL")});
                        if(!user.validateSync()){
                            user.save(function(err, res){
                                if(err) throw(err);
                            });
                        } else {
                            return res.status(400).json({message: user.validateSync().message, error: true});
                        }
                        if(!newUserBuy.validateSync()){
                            newUserBuy.save(function(err, res){
                                if(err) throw(err);
                            });
                        } else {
                            return res.status(400).json({message: newUserBuy.validateSync().message, error: true});
                        }
                        return res.json({user_id: user._id, item_id: tour._id, name: tour.name, category: "خرید تور آموزشی", price: tour.price, date: new persianDate().format("LLLL")});
                    } else {
                        return res.status(400).json({message: "موجودی شما کافی نیست", error: true});
                    }
                });
            }
            });
    }); 
};

exports.getTour = function(req, res) {
    Tour.findOne({_id: req.query.id}, function(err, tour){
        if(err) throw(err);
        if(!tour){
            return res.status(400).json({message: "شناسه وارد شده نامعتبر است", error: true});
        }
        return res.json({result: tour});
    });
};

exports.getTours = function(req, res) {
    Tour.find({}, function(err, tours){
        if(err) throw(err);
        return res.json({results: tours});
    });
};