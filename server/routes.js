// Assign a controller to routes

module.exports = {
  '/movie': require('./controllers/MovieController'),
  '/user': require('./controllers/UserController'),
  '/book': require('./controllers/BookController'),
  '/sendAdminMessage': require('./controllers/sendAdminMessage')
};
