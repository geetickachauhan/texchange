/*
	Registry for all system models
*/

module.exports = {
  movie: require('./Movie.js'),
  user: require('./User.js'),
  book: require('./Book.js'),
  sendAdminMessage: require('./sendAdminMessage.js')
};
