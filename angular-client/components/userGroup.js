angular.module('app')
.component('userGroup', {
  bindings: {
    users: '<',
    selectedusergroup: '<'
  },
  controller: function() {},
  templateUrl: '/templates/user-group.html'
});