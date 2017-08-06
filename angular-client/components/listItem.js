angular.module('app')
.component('listItem', {
  bindings: {
    item: '<',
    handleclicklistitem: '<'
  },
  controller: function() {},
  templateUrl: '/templates/list-item.html'
});