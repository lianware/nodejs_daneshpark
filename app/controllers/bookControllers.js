var Book = require('../models/bookModel.js'),
  User = require('../models/userModel.js'),
  userBuy = require('../models/userBuyModel.js'),
  userBook = require('../models/userBookModel.js'),
  persianDate = require('persian-date');

exports.addBook = function(req, res) {
    User.findOne({remember_token: req.headers.token}, function(err, user){
        if(err) throw(err);
        req.body.user_id = user._id;
        var newBook = new Book(req.body);
        newBook.save(function(err, book){
            if(err) throw(err);
            return res.json({book});
        });
    });
};

exports.buyBook = function(req, res) {
    User.findOne({remember_token: req.query.token}, function(err, user){
        if(err) throw(err);
        Book.findOne({_id: req.query.id}, function(err, book){
            if(err) throw(err);
            var newUserBuy = new userBuy({user_id: user._id, item_id: book._id, name: book.name, state: -1, price: book.price, date: new persianDate().format("LLLL")});
            newUserBuy.save(function(err, res){
                if(err) throw(err);
            });
            var newUserBook = new userBook({user_id: user._id, book_id: book._id});
            newUserBook.save(function(err, res){
                if(err) throw(err);
            });
            return res.json({user_id: user._id, item_id: book._id, name: book.name, category: "خرید از فروشگاه کتاب", price: book.price, date: new persianDate().format("LLLL")});
        });
    }); 
};

exports.getBook = function(req, res) {
    User.findOne({remember_token: req.query.token}, function(err, user){
        if(err) throw(err);
        Book.find({user_id: user._id}, function(err, book){
            if(err) throw(err);
            return res.json({book});
        });
    });
};

exports.getBooks = function(req, res) {
    Book.find({}, function(err, books){
        if(err) throw(err);
        return res.json({books});
    });
};

exports.getAuthor = function(req, res) {
    Book.findOne({_id: req.query.id}, function(err, book){
        if(err) throw(err);
        User.findOne({_id: book.user_id}, function(err, user){
            if(err) throw(err);
            user.password = undefined;
            user.remember_token = undefined;
            return res.json({user});
        });
    });
};