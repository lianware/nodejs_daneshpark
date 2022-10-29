module.exports = function(app) {
    var bookHandlers = require('../controllers/bookControllers.js');
    app.route('/add/book')
        .post(bookHandlers.addBook);
    app.route('/buy/book')
        .post(bookHandlers.buyBook);
    app.route('/get/book')
        .get(bookHandlers.getBook);
    app.route('/get/books')
        .get(bookHandlers.getBooks);
    app.route('/get/author/book')
        .get(bookHandlers.getAuthor);
};