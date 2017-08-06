angular.module('app')
.controller('AppCtrl', function(itemsService, userGroupsService, itemsListService) {
  // itemsService.getAll((data) => {
  //   this.items = data;
  // });
  itemsListService.getUserGroupNames((usergroupnames) => {
    this.items = usergroupnames;
  });
  this.handleclicksubmit = (userGroupQuery) => {
    userGroupsService.post(userGroupQuery, (userGroupQuery) => {
      this.items.push(userGroupQuery.join(', '));
    });
  };
  this.handleclicklistitem = (accountList) => {
    itemsService.getUserGroup(accountList, (usernames) => {
      // set this.users to userlist
      this.users = usernames;
      this.selectedusergroup = accountList;
    });
  }; 
  this.items = [];
  this.users = [];
  this.selectedusergroup = this.selectedusergroup || 'none selected';
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});