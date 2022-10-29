module.exports = function(app) {
    var tourHandlers = require('../controllers/tourControllers.js');
    app.route('/add/tour')
        .post(tourHandlers.addTour);
    app.route('/buy/tour')
        .post(tourHandlers.buyTour);
    app.route('/get/tour')
        .get(tourHandlers.getTour);
    app.route('/get/tours')
        .get(tourHandlers.getTours);
};