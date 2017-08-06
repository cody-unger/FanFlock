angular.module('app')
.service('itemsListService', function($http) {
  this.getUserGroupNames = function(callback) {
    $http({
        method: "GET",
        url: "/items",
        contentType: 'application/JSON'
    }).then(function successCallback(response) {
        callback(response.data.usergroupnames);
      }, function errorCallback(response) {
        console.log('error');
    });;
  };
});