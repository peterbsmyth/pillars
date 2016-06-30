var chartsApp = angular.module('chartsApp',['ui.router','chartsApp.services','chartsApp.filters']);

chartsApp.config(function($stateProvider,$urlRouterProvider,$locationProvider){

  $urlRouterProvider.otherwise("/summary");

  $stateProvider.state('stackedState', {
    url: '/stacked',
    templateUrl: 'views/partials/stacked.html',
    controller: 'StackedCtrl'
  });

  $stateProvider.state('donutState', {
    url: '/donut',
    templateUrl: 'views/partials/donut.html',
    controller: 'DonutCtrl'
  });

  $stateProvider.state('activityState', {
    url: '/activity',
    templateUrl: 'views/partials/activity.html',
    controller: 'ActivityCtrl'
  });

  $stateProvider.state('weeklyActivityState', {
    url: '/weekly-activity',
    templateUrl: 'views/partials/weekly_activity.html',
    controller: 'WeeklyActivityCtrl'
  });

  $stateProvider.state('annualCalendarState', {
    url: '/annual-calendar',
    templateUrl: 'views/partials/annual_calendar.html',
    controller: 'AnnualCalendarCtrl'
  });

  $stateProvider.state('dataExplorerState', {
    url: '/data-explorer',
    templateUrl: 'views/partials/data_explorer.html',
    controller: 'DataExplorerCtrl'
  });

  $stateProvider.state('dataExplorerState.table', {
    url: '/table',
    templateUrl: 'views/partials/data_explorer/table.html',
    controller: 'DataExplorerCtrl'
  });

  $stateProvider.state('dataExplorerState.calendar', {
    url: '/calendar',
    templateUrl: 'views/partials/data_explorer/calendar.html',
    controller: 'DataExplorerCtrl'
  });

  $stateProvider.state('dataExplorerState.line', {
    url: '/line',
    templateUrl: 'views/partials/data_explorer/line.html',
    controller: 'DataExplorerCtrl'
  });

  $stateProvider.state('dashboardState', {
    url: '/dashboard',
    templateUrl: 'views/index.html',
    controller: 'DashboardCtrl'
  });

  $stateProvider.state('summaryState', {
    url: '/summary',
    templateUrl: 'views/summary.html',
    controller: 'SummaryCtrl'
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false // problematic
  });
});
