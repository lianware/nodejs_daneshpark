const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('34940947-178e-4e8c-ab1b-5bfdbb363c03', false);
const User = require('../models/userModel.js');
const UserCharge = require('../models/userChargeModel.js');
const persianDate = require('persian-date');


exports.AddPayment = function(req, res) {
    zarinpal.PaymentRequest({
        Amount: req.query.amount,
        CallbackURL: 'http://daneshpark.ir:1090/payment/callback?token=' + req.query.token + "&amount=" + req.query.amount + "&description=" + req.query.description,
        Description: req.query.description,
        Email: 'ma.khajeian@gmail.com',
        Mobile: '09026616530'
    }).then(response => {
        if (response.status === 100) {
            return res.json({CallbackURL: response.url});
        }
    }).catch(err => {
        console.error(err);
    });
};

exports.CallBackPayment = function(req, res) {
    if(req.query.Status == "OK"){
      User.findOne({remember_token: req.query.token}, function(err, user){
        if(err) throw(err);
        if(!user){
            return res.status(401).json({message: "توکن وارد شده نامعتبر است", error: true});
        }
        user.amount += req.query.amount/1000;
        user.save(function(err, res){
          if(err) throw(err);
        });
        // Payment Verification
        zarinpal.PaymentVerification({
          Amount: req.query.amount,
          Authority: req.query.Authority,
        }).then(response => {
          if (response.status !== 100) {
            console.log('NOT Verified!');
          } else {
            var userCharge = new UserCharge({ref_id: response.RefID, authority: req.query.Authority, status: req.query.Status, user_id: user._id, amount: req.query.amount/1000, description: req.query.description, date: new persianDate(new Date((new Date()).toLocaleString("en-US", {timeZone: "Asia/Tehran"}))).format("LLLL")}); 
            userCharge.save(function(err, res){
              if(err) throw(err);
            });
            return res.json({status: response.status});
          }
        }).catch(err => {
          console.error(err);
        });
      });  
    } else if (req.query.Status == "NOK"){
      //...    
    }
};