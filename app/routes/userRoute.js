module.exports = function(app) {
    var userHandlers = require('../controllers/userController.js');
    app.route('/user/authenticate')
        .post(userHandlers.authenticate);
    app.route('/user/new')
        .post(userHandlers.register);
};