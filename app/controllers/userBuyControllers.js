var Book = require('../models/bookModel.js'),
  User = require('../models/userModel.js'),
  userBuy = require('../models/userBuyModel.js');

exports.addTransaction = function(req, res) {
    var newTrans = new userBuy(req.body);
    newTrans.save(function(err, tran){
        if(err) throw(err);
        return res.json({result: tran});
    });
};

exports.getTransaction = function(req, res) {
    userBuy.findOne({_id: req.query.id}, function(err, tran){
        if(err) throw(err);
        if(!tran){
            return res.status(400).json({message: "شناسه وارد شده نامعتبر است", error: true});
        }
        return res.json({result: tran});
    });
};

exports.getTransactions = function(req, res) {
    userBuy.find({}, function(err, trans){
        if(err) throw(err);
        return res.json({results: trans});
    });
};

exports.getUserTransactions = function(req, res) {
    userBuy.find({user_id: req.query.id}, function(err, trans){
        if(err) throw(err);
        if(!trans){
            return res.status(400).json({message: "شناسه وارد شده نامعتبر است", error: true});
        }
        return res.json({results: trans});
    });
};