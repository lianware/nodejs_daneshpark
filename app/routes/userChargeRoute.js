module.exports = function(app) {
    var chargeHandlers = require('../controllers/userChargeControllers.js');
    app.route('/get/charges')
        .get(chargeHandlers.getCharges);
};