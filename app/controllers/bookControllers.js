var Book = require('../models/bookModel.js'),
  User = require('../models/userModel.js'),
  userBuy = require('../models/userBuyModel.js'),
  userBook = require('../models/userBookModel.js'),
  persianDate = require('persian-date');

exports.addBook = function(req, res) {
    User.findOne({remember_token: req.headers.token}, function(err, user){
        if(err) throw(err);
        if(!user){
            return res.status(401).json({message: "توکن وارد شده نامعتبر است", error: true});
        }
        req.body.user_id = user._id;
        var newBook = new Book(req.body);
        if(!newBook.validateSync()){
            newBook.save(function(err, book){
                if(err) throw(err);
                return res.json({result: book});
            });
        } else {
            return res.status(400).json({message: newBook.validateSync().message, error: true});
        }
    });
};

exports.buyBook = function(req, res) {
    User.findOne({remember_token: req.query.token}, function(err, user){
        if(err) throw(err);
        if(!user){
            return res.status(401).json({message: "توکن وارد شده نامعتبر است", error: true});
        }
        userBuy.findOne({$and: [{user_id: user._id}, {item_id: req.query.id}]}, function(err, uBuy){
            if(err) throw(err);
            if(uBuy){
                return res.status(400).json({message: "این کتاب قبلا توسط شما خریداری شده است", error: true});   
            } else {
                Book.findOne({_id: req.query.id}, function(err, book){
                    if(err) throw(err);
                    if(!book){
                        return res.status(400).json({message: "شناسه وارد شده نامعتبر است", error: true});
                    }
                    if(user.amount >= book.price){
                        user.amount -= book.price;
                        var newUserBuy = new userBuy({user_id: user._id, item_id: book._id, name: book.name, state: -1, price: book.price, date: new persianDate().format("LLLL")});
                        var newUserBook = new userBook({user_id: user._id, book_id: book._id});
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
                        if(!newUserBook.validateSync()){
                            newUserBook.save(function(err, res){
                                if(err) throw(err);
                            });
                        } else {
                            return res.status(400).json({message: newUserBook.validateSync().message, error: true});
                        }
                        return res.json({user_id: user._id, item_id: book._id, name: book.name, category: "خرید از فروشگاه کتاب", price: book.price, date: new persianDate().format("LLLL")});
                    } else {
                        return res.status(400).json({message: "موجودی شما کافی نیست", error: true});
                    }
        
                });
            }
        });
    }); 
};

exports.getBook = function(req, res) {
    User.findOne({remember_token: req.query.token}, function(err, user){
        if(err) throw(err);
        if(!user){
            return res.status(401).json({message: "توکن وارد شده نامعتبر است", error: true});
        }
        Book.find({user_id: user._id}, function(err, book){
            if(err) throw(err);
            if(!book){
                return res.status(400).json({message: "شناسه وارد شده نامعتبر است", error: true});
            }
            return res.json({results: book});
        });
    });
};

exports.getBooks = function(req, res) {
    Book.find({}, function(err, books){
        if(err) throw(err);
        return res.json({results: books});
    });
};

exports.getAuthor = function(req, res) {
    Book.findOne({_id: req.query.id}, function(err, book){
        if(err) throw(err);
        if(!book){
            return res.status(400).json({message: "شناسه وارد شده نامعتبر است", error: true});
        }
        User.findOne({_id: book.user_id}, function(err, user){
            if(err) throw(err);
            user.password = undefined;
            user.remember_token = undefined;
            return res.json({results: user});
        });
    });
};