'use strict';

// Uses Google's Geocoding API to turn lat/long coordinates into an address
//angular.module('DarkSky')
//    .factory('location', ['$http', function($http) {
//        var key = 'AIzaSyD1Q5lIbo9L0i3lVjnPmjHbtdeRCNvEsQ4';
//
//        var location = {};
//
//        location.getAddress = function(loc, callback) {
//            console.log('Parsing loc data, creating API call');
//            var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc.lat +',' + loc.long + '&key=' + key;
//            
//            console.log('Began the Geocode API call');
//            $http.get(url)
//                .success(function(loc, data) {
//                    callback(loc, data);
//                    console.log("Returned the location data, shown below");
//                    console.log(data);
//            })
//                .error(function(err) {
//                    callback(err);
//                    console.log('Something fucked up in the Geocode API call...');
//                });
//        };
//        
//        return location;
//    }]);