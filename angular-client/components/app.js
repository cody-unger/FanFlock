angular.module('app')
.controller('AppCtrl', function(itemsService, userGroupsService) {
  itemsService.getAll((data) => {
    this.items = data;
  });
  this.handleclick = (userGroupQuery) => {
    userGroupsService.post(userGroupQuery);
  } 
  this.items = [{description: 'list item'}, {description: 'list item'}, {description: 'list item'}];
  this.users = [{handle: '@bob', proflink: 'twitter.com'}, {handle: '@bob', proflink: 'twitter.com'}, {handle: '@bob', proflink: 'twitter.com'}];
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});