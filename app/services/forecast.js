'use strict';

// Services for the app (reverse geocoding, weather data)
angular.module('DarkSky')

    // Calls the Dark Sky API, returns the resulting JSON
    .factory('forecast', ['$http', function($http) {
        var url = 'https://api.darksky.net/forecast/d545dfd43b28ee98f767b4eaf6b7b454/42.3601,-71.0589';
        var testUrl = 'https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json';

        var forecast = {};

        forecast.getWeather = function(callback) {
            console.log('Began the API call');
            $http.get(url)
                .success(function(data) {
                    callback(data);
                    console.log("Returned the Dark Sky data, seen here:");
                    console.log(data);
            })
                .error(function(err) {
                    callback(err);
                    console.log('Something fucked up in the API call...');
                });
        };
        
        /*
        // Cleans data returned by the getWeather function
        forecast.cleanData = function(callback) {
            console.log('Began cleaning data.');
            var data = {};
            
            // TODO : do reverse lat/long lookup?
            data.push(location: 'Boston');
            
            
        };
        */
        
        return forecast;
    }])

    // Takes a lat/long, produces a city/state
    .factory('location', ['$http', function($http) {
        var key = 'AIzaSyD1Q5lIbo9L0i3lVjnPmjHbtdeRCNvEsQ4';

        var location = {};

        location.getAddress = function(loc, callback) {
            console.log('Parsing loc data, creating API call');
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc.lat +',' + loc.long + '&key=' + key;
            
            console.log('Began the Geocode API call');
            $http.get(url)
                .success(function(data) {
                    console.log("Returned the location data, shown below. Starting callback.");
                    console.log(data);
                    callback(data);
            })
                .error(function(err) {
                    callback(err);
                    console.log('Something fucked up in the Geocode API call...');
                });
        };
        
        return location;
    }]);