'use strict';

angular.module('DarkSky', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/'
    });
});