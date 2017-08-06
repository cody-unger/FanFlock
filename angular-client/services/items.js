angular.module('app')
.service('itemsService', function($http) {
  this.getUserGroup = function(accountList, callback) {
    accountList = accountList.split(', ');
    $http({
        method: "POST",
        url: "/getUserGroup",
        data: JSON.stringify({accountList}),
        contentType: 'application/JSON'
    }).then(function successCallback(response) {
        callback(response.data.usernames);
      }, function errorCallback(response) {
        console.log('error');
    });;
  };
});