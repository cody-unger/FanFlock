var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'plantlife',
  database : 'fanflock'
});

var selectUserGroup = function(callback) {
  connection.query('SELECT * FROM followers', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var selectFollowed = function(callback, username) {
  connection.query('SELECT id FROM followed WHERE username = "' + username + '"', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var addNewFollowed = function(callback, username) {
  connection.query('INSERT INTO followed (username) VALUES ("' + username + '")', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var deleteFollowers = function(callback, following) {
  connection.query('DELETE FROM followers WHERE following = ' + following, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var addFollowers = function(callback, followers, following) {
  followers.forEach(function(follower) {
    connection.query('INSERT INTO followers (userid, following) VALUES (' + follower + ', ' + following + ')', function(err, results, fields) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  });
};

module.exports.selectUserGroup = selectUserGroup;
module.exports.addNewFollowed = addNewFollowed;
module.exports.selectFollowed = selectFollowed;
module.exports.addFollowers = addFollowers;
module.exports.deleteFollowers = deleteFollowers;
