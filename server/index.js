var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var fs = require('fs');
var messageCounter = 1;

// Create the application.
var app = express();



// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/meanapp');
mongoose.connection.once('open', function() {

  // Load all system models
  app.models = require('./models/index');

  // Load the routes
  var routes = require('./routes');

  // Iterate over all routes and assign respective controller
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
  });

  //Send admin message / Write to file
  app.use('/sendAdminMessage', function (req, res, next) {
    
    if(req.query.type === 'reset'){

      var user = mongoose.model('user', app.models.book.UserSchema)

      user.findOne({email: req.query.message}, function(err, user){
          if (err) return 
          var found = false;

          if(user !== null){
            found = true;
          }

          if(found){
            // Create file
            var stream = fs.createWriteStream("userMessages/"+(messageCounter++)+"-reset.txt");
            stream.once('open', function(fd) {

              // Write into file
              stream.write("======== RESET PASSWORD REQUESTED =======\n\n");
              stream.write("Hello, \nDear " +req.query.message+ ". Our system has been notified of your account requesting a password reset. Please use the temporary password 41z!@rf to sign in and a new password option will be available to you. Thank you for being a loyal texchange customer and happy shopping!\n\nLove,\nThe texchange team");

              // Close the file stream
              stream.end();
            });      
          }


      });

      
    }

    else {

      // Create file
      var stream = fs.createWriteStream("adminMessages/"+(messageCounter++)+".txt");
      stream.once('open', function(fd) {

        // Write into file
        stream.write("======== ADMIN MESSAGE =======\n\n");
        stream.write("Type: " +req.query.type + "\n");
        stream.write("Subject: " +req.query.subject + "\n\n");
        stream.write("Message: " +req.query.message + "\n");

        // Close the file stream
        stream.end();
      });  
    }
    

    next()
  })


  //Send admin message / Write to file
  app.use('/getBooks', function (req, res, next) {
    
    var title = req.query.title;
    console.log('Searching for ' + title);
    var book = mongoose.model('book', app.models.book.BookSchema)
    var books = [];
    book.find({"title" : {$regex : ".*"+title+".*"}}, function(err, docs){
      if(err){
        return res.send();
      }
      books = docs;
      console.log(books);
      res.send(books);    
    });
      
    
  })

  //Send user banned message
  app.use('/banUser', function (req, res, next) {
    
      console.log(req.query.email)

      var user = mongoose.model('user', app.models.book.UserSchema)

      user.findOne({email: req.query.email}, function(err, user){
          if (err) return 
          var found = false;

          if(user !== null){
            found = true;
          }

          if(found){
            // Create file
            var stream = fs.createWriteStream("userMessages/"+(messageCounter++)+"-banned.txt");
            stream.once('open', function(fd) {

              // Write into file
              stream.write("======== YOUR ACCOUNT HAS BEEN BANNED =======\n\n");
              stream.write("Hello, \nDear " +req.query.username+ ". Our system has been notified of your account recently being banned. If you would like to regain access to your account to be able to buy and sell textbooks, please contact one of our admins. You can do so by going to our home page and clicing 'Contact an Admin' at the bottom. Thanks for shopping at Textchange!\n\nLove,\nThe texchange team");

              // Close the file stream
              stream.end();
            });      
          }
      });

    next()
  })


  //Send user banned message
  app.use('/unBanUser', function (req, res, next) {
    
      console.log(req.query.email)

      var user = mongoose.model('user', app.models.book.UserSchema)

      user.findOne({email: req.query.email}, function(err, user){
          if (err) return 
          var found = false;

          if(user !== null){
            found = true;
          }

          if(found){
            // Create file
            var stream = fs.createWriteStream("userMessages/"+(messageCounter++)+"-unBanned.txt");
            stream.once('open', function(fd) {

              // Write into file
              stream.write("======== YOUR ACCOUNT HAS BEEN UNBANNED =======\n\n");
              stream.write("Hello, \nDear " +req.query.username+ ". Our system has been notified of your account recently being unBanned. You have now regained full access to your account! Thank you for shopping at Textchange!\n\nLove,\nThe texchange team");

              // Close the file stream
              stream.end();
            });      
          }
      });

    next()
  })


  console.log('Listening on port 3000...');
  app.listen(3000);

  var book = mongoose.model('book', app.models.book.BookSchema)

});
