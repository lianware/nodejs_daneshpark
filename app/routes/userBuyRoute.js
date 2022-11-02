module.exports = function(app) {
    var transactionHandlers = require('../controllers/userBuyControllers.js');
    app.route('/add/transaction')
        .post(transactionHandlers.addTransaction);
    app.route('/get/transaction')
        .get(transactionHandlers.getTransaction);
    app.route('/get/transactions')
        .get(transactionHandlers.getTransactions);
    app.route('/get/transactions/user')
        .get(transactionHandlers.getUserTransactions);
};