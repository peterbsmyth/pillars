var chartsApp = angular.module('chartsApp',['ui.router']);

chartsApp.config(function($stateProvider,$urlRouterProvider){

  $urlRouterProvider.otherwise("/stacked");

  $stateProvider.state('stackedState', {
    url: '/stacked',
    templateUrl: 'stacked.html',
    controller: 'StackedCtrl'
  });

  $stateProvider.state('donutState', {
    url: '/donut',
    templateUrl: 'donut.html',
    controller: 'DonutCtrl'
  });

  $stateProvider.state('activityState', {
    url: '/activity',
    templateUrl: 'activity.html',
    controller: 'ActivityCtrl'
  });

});
