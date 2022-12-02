const UserCharge = require('../models/userChargeModel.js');


exports.getCharges = function(req, res){
    UserCharge.find({}, function(err, charges){
        if(err) throw(err);
        return res.json({results: charges});
    });
};