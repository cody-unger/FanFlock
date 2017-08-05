var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var mysqldb = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(bodyParser.json());

app.get('/items', function (req, res) {
  // items.selectUserGroup(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
});

app.post('/items', function (req, res) {
  req.body.userGroupQuery.forEach(function(username) {
    var lcUsername = username.toLowerCase();
    var options = {
      url: 'https://api.twitter.com/1.1/followers/ids.json?cursor=-1&screen_name=' + lcUsername + '&count=5000',
      headers: {
        'User-Agent': 'request'
        // 'Authorization': 'token ihlnJQ6b0BYrVY2Kk9T89Uq5W'
      },
      oauth: {
        consumer_key: 'ihlnJQ6b0BYrVY2Kk9T89Uq5W', 
        consumer_secret: 'eNQifh5ar7UkOWH34YIiw9c8x7EQuWHWCzPc5iWzip1kH9N7uW',
        token: '893651977338368000-h6GVhlnZyv6XhUH9FBLCntRrDuBEoAv',
        token_secret: 'AjVJvPMmhXVC3do1XznwKdHTKInCTKrxvDKzl1XQe0C8n'
      }
    };
    var callback = function(error, response, body) {
      if (error) {
        // console.log(error);
      } else {
        var resBody = JSON.parse(response.body);
        mysqldb.selectFollowed((err, results) => {
          // err && console.log(err);
          if (results.length === 0) {
            mysqldb.addNewFollowed((err, results) => {
              // err && console.log(err);
              results && mysqldb.selectFollowed((err, results) => {
                // err && console.log(err);
                // add each of response.ids to followers, each with following of results[0].id
                results && mysqldb.addFollowers((err, results) => {
                  // err && console.log(err);
                  // results && console.log('made it here: ', results);
                }, resBody.ids, results[0].id);
              }, lcUsername);
            }, lcUsername);
          } else {
            // delete all followers with results[0].id
            // then add each of response.ids to followers, each with following of results[0].id
            mysqldb.deleteFollowers((err, results) => {
              // err && console.log(err);
              results && mysqldb.addFollowers((err, results) => {
                  // err && console.log(err);
                  // results && console.log('made it there: ', results);
                }, resBody.ids, results[0].id);
            }, resBody.ids, results[0].id);
          }
        });
      }
    };
    request(options, callback);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

