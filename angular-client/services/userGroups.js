angular.module('app')
.service('userGroupsService', function($http) {
  this.post = function(userGroupQuery, callback) {
    userGroupQuery = userGroupQuery.split(',');
    $http({
        method: "POST",
        url: "/submitUserGroup",
        data: JSON.stringify({userGroupQuery}),
        contentType: 'application/JSON'
    }).then(function successCallback(response) {
        callback(userGroupQuery);
      }, function errorCallback(response) {
        console.log('error');
    });;
  };
});