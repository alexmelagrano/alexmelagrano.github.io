'use strict';

angular.module('DarkSky')
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    })
  });