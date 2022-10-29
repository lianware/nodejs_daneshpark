var Book = require('../models/bookModel.js'),
  User = require('../models/userModel.js');
  Tour = require('../models/tourModel.js');

exports.addTour = function(req, res) {
    newTour = new Tour(req.body);
    newTour.save(function(err, tour){
        if(err) throw(err);
        return res.json({Tour});
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