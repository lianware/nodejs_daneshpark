module.exports = function(app) {
    var payHandlers = require('../controllers/paymentController.js');
    app.route('/payment/add')
        .get(payHandlers.AddPayment);
    app.route('/payment/callback')
        .get(payHandlers.CallBackPayment);
};