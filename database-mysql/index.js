var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'plantlife',
  database : 'fanflock'
});

var selectUserGroup = function(callback, accountList) {
  var subQueryStr = 'SELECT userid FROM followers INNER JOIN followed ON followers.following = followed.id AND followed.username IN ("' + accountList.join('","') + '")';
  var queryStr = 'SELECT * FROM (' + subQueryStr + ') AS tablename GROUP BY userid HAVING COUNT(*) = ' + accountList.length;

  connection.query(queryStr, function(err, results, fields) {
    if(err) {
      callback(err, null);
      console.log(err);
    } else {
      callback(null, results.slice(0, 50));
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

var addNewUserGroupName = function(userGroupName) {
  connection.query('INSERT INTO usergroupnames (usergroupname) VALUES ("' + userGroupName + '")', function(err, results, fields) {
      // if(err) {
      //   callback(err, null);
      // } else {
      //   callback(null, results);
      // }
    });
};

var getUserGroupNames = function(callback) {
  connection.query('SELECT usergroupname FROM usergroupnames', function(err, results, fields) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
};

module.exports.selectUserGroup = selectUserGroup;
module.exports.addNewFollowed = addNewFollowed;
module.exports.selectFollowed = selectFollowed;
module.exports.addFollowers = addFollowers;
module.exports.deleteFollowers = deleteFollowers;
module.exports.addNewUserGroupName = addNewUserGroupName;
module.exports.getUserGroupNames = getUserGroupNames;
