'use strict';

angular.module('DarkSky')
    .directive('asdf', () => ({
    templateUrl: 'components/header/navHeader.html',
    restrict: 'E',
    controller: 'HeaderController',
    controllerAs: 'header'
}));