var chartsApp = angular.module('chartsApp',['ui.router']);

chartsApp.config(function($stateProvider,$urlRouterProvider){

  $urlRouterProvider.otherwise("/stacked");

  $stateProvider.state('stackedState', {
    url: '/stacked',
    templateUrl: 'partials/stacked.html',
    controller: 'StackedCtrl'
  });

  $stateProvider.state('donutState', {
    url: '/donut',
    templateUrl: 'partials/donut.html',
    controller: 'DonutCtrl'
  });

  $stateProvider.state('activityState', {
    url: '/activity',
    templateUrl: 'partials/activity.html',
    controller: 'ActivityCtrl'
  });

  $stateProvider.state('weeklyActivityState', {
    url: '/weekly-activity',
    templateUrl: 'partials/weekly_activity.html',
    controller: 'WeeklyActivityCtrl'
  });


});
