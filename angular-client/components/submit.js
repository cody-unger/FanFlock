angular.module('app')
.component('submit', {
  bindings: {
    handleclick: '<',
  },
  controller: function() {
    this.value = '';
  },
  templateUrl: '/templates/submit.html'
});