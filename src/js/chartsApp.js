var chartsApp = angular.module('chartsApp',['ui.router','chartsApp.services']);

chartsApp.config(function($stateProvider,$urlRouterProvider){

  $urlRouterProvider.otherwise("/weekly-activity");

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

  $stateProvider.state('annualCalendarState', {
    url: '/annual-calendar',
    templateUrl: 'partials/annual_calendar.html',
    controller: 'AnnualCalendarCtrl'
  });


});
