angular.module('app')
.component('submit', {
  bindings: {
    handleclicksubmit: '<',
  },
  controller: function() {
    this.value = '';
  },
  templateUrl: '/templates/submit.html'
});