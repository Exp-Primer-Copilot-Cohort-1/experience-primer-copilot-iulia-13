//Create web server
var express = require('express');
var app = express();

//Handle POST request
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//Handle static files
app.use(express.static(__dirname));

//Handle POST request
app.post('/addComment', function(req, res){
  //Get the comment from the POST request
  var comment = req.body.comment;
  //Get the name from the POST request
  var name = req.body.name;
  //Get the current date
  var date = new Date();
  //Create an object with the comment info
  var commentObj = {
    name: name,
    comment: comment,
    date: date
  };
  //Get the comments array
  var comments = require('./comments.json');
  //Add the new comment to the array
  comments.push(commentObj);
  //Save the new comment to the json file
  var fs = require('fs');
  fs.writeFile('comments.json', JSON.stringify(comments), function(err){
    if (err) {
      console.log(err);
    }
    else {
      console.log('Comment added');
    }
  });
  //Send the response
  res.send('Comment added');
});

//Handle GET request
app.get('/getComments', function(req, res){
  //Get the comments array
  var comments = require('./comments.json');
  //Send the response
  res.send(comments);
});

//Start the server
var server = app.listen(8081, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});