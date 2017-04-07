const myApp = angular.module('app', ['ui.router']);

myApp.config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.rules.otherwise({ state: 'home' });

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'js/home/home.html',
    controller: 'homeController',
  });

  $stateProvider.state('call', {
    url: '/call/{callID}',
    templateUrl: 'js/call/call.html',
    controller: 'callController',
    resolve: {
      callID: function ($stateParams) {
        return $stateParams.callID;
      },
    },
  });

  $stateProvider.state('multipleCalls', {
    url: '/call/multipleCalls',
    templateUrl: 'js/multipleCalls/multipleCalls.html',
    controller: 'multipleCallsController',
  });
});
