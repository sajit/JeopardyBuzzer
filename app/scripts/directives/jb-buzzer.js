(function() {
  'use strict';

  angular.module('jeopardyBuzzerApp')
    .directive('jbBuzzer', Directive);

  function Directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'views/jb-buzzer.html',
      scope: {},
      link: function(scope, el, attr, ctrl) {},
      controller: Controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  Controller.$inject = ['$timeout'];
  function Controller($timeout) {
    var vm = this;

    function activate() {
      vm.buzz = _buzz;
      vm.team = { name: _genTemName() };
      vm.isBuzzed = false;
    }

    function _genTemName() {
      var min = 1, max = 100;
      var teamNum = Math.floor(Math.random() * (max - min) + min);
      return 'Team ' + teamNum;
    }

    function _buzz() {
      var queueRef = window.firebase.child('queue');
      queueRef.push().set({
        team: vm.team.name
      });
      vm.isBuzzed = true;
      $timeout(function() { vm.isBuzzed = false; }, 2000);
    }

    activate();
  }

})();
