var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(bodyParser.json());

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/items', function (req, res) {
  var options = {
    url: 'https://api.twitter.com/1.1/followers/ids.json?cursor=-1&screen_name=navsarisvs&screen_name=abhishekb90&count=5000',
    headers: {
      'User-Agent': 'request'
      // 'Authorization': 'token ihlnJQ6b0BYrVY2Kk9T89Uq5W'
    },
    oauth:
        { consumer_key: 'ihlnJQ6b0BYrVY2Kk9T89Uq5W', 
          consumer_secret: 'eNQifh5ar7UkOWH34YIiw9c8x7EQuWHWCzPc5iWzip1kH9N7uW',
          token: '893651977338368000-h6GVhlnZyv6XhUH9FBLCntRrDuBEoAv',
          token_secret: 'AjVJvPMmhXVC3do1XznwKdHTKInCTKrxvDKzl1XQe0C8n'
        }
  };
  var callback = function(error, response, body) {
    if (error) {
      console.log(error);
    } else {
      console.log(response.body);
    }
  }
  request(options, callback);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

