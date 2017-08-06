angular.module('app')
.component('list', {
  bindings: {
    items: '<',
    handleclicklistitem: '<'
  },
  controller: function() {},
  templateUrl: '/templates/list.html'
});