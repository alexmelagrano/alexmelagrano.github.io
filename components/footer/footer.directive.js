'use strict';

angular.module('DarkSky')
    .directive('foot', () => ({
    templateUrl: 'components/footer/footer.html',
    restrict: 'E',
    controller: 'FooterController',
    controllerAs: 'footer'
}));