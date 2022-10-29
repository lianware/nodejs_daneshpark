var Book = require('../models/bookModel.js'),
  User = require('../models/userModel.js'),
  userBuy = require('../models/userBuyModel.js');

exports.addTransaction = function(req, res) {
    var newTrans = new userBuy(req.body);
    newTrans.save(function(err, trans){
        if(err) throw(err);
        return res.json({trans});
    });
};

exports.getTransaction = function(req, res) {
    userBuy.findOne({_id: req.query.id}, function(err, tran){
        if(err) throw(err);
        return res.json({tran});
    });
};

exports.getTransactions = function(req, res) {
    userBuy.find({}, function(err, trans){
        if(err) throw(err);
        return res.json({trans});
    });
};