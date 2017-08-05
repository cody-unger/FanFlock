angular.module('app')
.controller('AppCtrl', function(itemsService, userGroupsService) {
  itemsService.getAll((data) => {
    this.items = data;
  });
  this.handleclick = (userGroupQuery) => {
    userGroupsService.post(userGroupQuery, (userGroupQuery) => {
      this.items.push(userGroupQuery.join(','));
    });
  }; 
  this.items = [];
  this.users = [{handle: '@bob', proflink: 'twitter.com'}, {handle: '@bob', proflink: 'twitter.com'}, {handle: '@bob', proflink: 'twitter.com'}];
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});