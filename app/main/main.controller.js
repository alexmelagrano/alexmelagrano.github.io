'use strict';

//Main controller file for the Dark Sky-based weather app
angular.module('DarkSky').controller('MainController', ['$scope', 'forecast', 'location', function ($scope, forecast, location) {
    
    console.log('Within main.controller, about to run forecast promise, then parse the location data')
    forecast.getWeather(function (data) {
        console.log('Retrieved data from the Dark Sky API');
        console.log(data);
        $scope.weatherData = data;

        // TODO :: use Google's Geocoding API to do an address lookup
        var latLong = {
            lat: data.latitude,
            long: data.longitude
        };

        console.log('Looking for the location at this latitude:' + data.latitude);
        console.log('Looking for the location at this longitude:' + data.longitude);

        location.getAddress(latLong, function (data) {
            console.log('Retrieved location data from the Geocode API. About to begin cleaning process.');
            // Parses the returned JSON to build the city/state format we want
            var results = data.results[0];
            var city = '';
            var state = '';

            for (var i = 0; i < results.address_components.length; i += 1) {
                var curComponent = results.address_components[i];
                var curType = curComponent.types[0];
                if (curType == 'locality') {
                    city = curComponent.long_name;
                    console.log('Found the city name: ' + curComponent.long_name);
                };
                if (curType == 'administrative_area_level_1') {
                    state = curComponent.short_name;
                    console.log('Found the state name: ' + curComponent.short_name);
                };
            };

            $scope.loc = city + ', ' + state;
            console.log('Stored the location data');
        });


        var cleanData = function(data) {
            // Five-Day Forecast
            // Gets integer for the day/week
            var tomorrow = new Date(data.daily.data[0].time * 1000).getDay();

            var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
            var forecast = [];
            for(var i = tomorrow; i < tomorrow + 5; i += 1){
                forecast.push(days[i % 5]);
            }

            $scope.weekly = forecast;
        };

        cleanData(data);
    });

    // var data =
    // {
    //     "latitude": 42.3601,
    //     "longitude": -71.0589,
    //     "timezone": "America/New_York",
    //     "offset": -5,
    //     "currently": {
    //         "time": 1484597285,
    //         "summary": "Partly Cloudy",
    //         "icon": "partly-cloudy-day",
    //         "nearestStormDistance": 120,
    //         "nearestStormBearing": 17,
    //         "precipIntensity": 0,
    //         "precipProbability": 0,
    //         "temperature": 40.84,
    //         "apparentTemperature": 35.88,
    //         "dewPoint": 21.81,
    //         "humidity": 0.46,
    //         "windSpeed": 7.49,
    //         "windBearing": 227,
    //         "visibility": 10,
    //         "cloudCover": 0.29,
    //         "pressure": 1026.45,
    //         "ozone": 293.22
    //     },
    //     "minutely": {
    //         "summary": "Partly cloudy for the hour.",
    //         "icon": "partly-cloudy-day",
    //         "data": [
    //             {
    //                 "time": 1484597280,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484597340,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484597400,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484597460,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484597520,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484597580,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484597640,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484597700,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484597760,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484597820,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484597880,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484597940,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598000,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598060,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598120,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598180,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598240,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598300,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598360,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598420,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598480,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598540,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598600,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598660,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598720,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598780,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598840,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598900,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484598960,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599020,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599080,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599140,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599200,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599260,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599320,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599380,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599440,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599500,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599560,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599620,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599680,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599740,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599800,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599860,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599920,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484599980,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600040,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600100,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600160,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600220,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600280,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600340,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600400,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600460,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600520,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600580,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600640,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600700,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600760,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600820,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             },
    //             {
    //                 "time": 1484600880,
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0
    //             }
    //         ]
    //     },
    //     "hourly": {
    //         "summary": "Partly cloudy until tomorrow afternoon.",
    //         "icon": "partly-cloudy-night",
    //         "data": [
    //             {
    //                 "time": 1484596800,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-day",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 40.94,
    //                 "apparentTemperature": 36.09,
    //                 "dewPoint": 21.1,
    //                 "humidity": 0.45,
    //                 "windSpeed": 7.31,
    //                 "windBearing": 228,
    //                 "visibility": 10,
    //                 "cloudCover": 0.29,
    //                 "pressure": 1026.53,
    //                 "ozone": 293.19
    //             },
    //             {
    //                 "time": 1484600400,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-day",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 40.26,
    //                 "apparentTemperature": 34.54,
    //                 "dewPoint": 25.89,
    //                 "humidity": 0.56,
    //                 "windSpeed": 8.72,
    //                 "windBearing": 222,
    //                 "visibility": 10,
    //                 "cloudCover": 0.3,
    //                 "pressure": 1025.92,
    //                 "ozone": 293.45
    //             },
    //             {
    //                 "time": 1484604000,
    //                 "summary": "Clear",
    //                 "icon": "clear-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 38.61,
    //                 "apparentTemperature": 32.62,
    //                 "dewPoint": 26.8,
    //                 "humidity": 0.62,
    //                 "windSpeed": 8.53,
    //                 "windBearing": 223,
    //                 "visibility": 10,
    //                 "cloudCover": 0.23,
    //                 "pressure": 1025.66,
    //                 "ozone": 293.76
    //             },
    //             {
    //                 "time": 1484607600,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 37.36,
    //                 "apparentTemperature": 30.9,
    //                 "dewPoint": 27.35,
    //                 "humidity": 0.67,
    //                 "windSpeed": 8.88,
    //                 "windBearing": 224,
    //                 "visibility": 10,
    //                 "cloudCover": 0.28,
    //                 "pressure": 1025.62,
    //                 "ozone": 293.97
    //             },
    //             {
    //                 "time": 1484611200,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 36.36,
    //                 "apparentTemperature": 29.22,
    //                 "dewPoint": 27.56,
    //                 "humidity": 0.7,
    //                 "windSpeed": 9.82,
    //                 "windBearing": 223,
    //                 "visibility": 9.99,
    //                 "cloudCover": 0.33,
    //                 "pressure": 1025.56,
    //                 "ozone": 293.94
    //             },
    //             {
    //                 "time": 1484614800,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 34.96,
    //                 "apparentTemperature": 27.39,
    //                 "dewPoint": 27.31,
    //                 "humidity": 0.73,
    //                 "windSpeed": 10.02,
    //                 "windBearing": 225,
    //                 "visibility": 9.91,
    //                 "cloudCover": 0.35,
    //                 "pressure": 1025.37,
    //                 "ozone": 293.54
    //             },
    //             {
    //                 "time": 1484618400,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 34.07,
    //                 "apparentTemperature": 26.18,
    //                 "dewPoint": 26.9,
    //                 "humidity": 0.75,
    //                 "windSpeed": 10.24,
    //                 "windBearing": 223,
    //                 "visibility": 9.85,
    //                 "cloudCover": 0.38,
    //                 "pressure": 1025.11,
    //                 "ozone": 292.89
    //             },
    //             {
    //                 "time": 1484622000,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 33.4,
    //                 "apparentTemperature": 25.68,
    //                 "dewPoint": 26.48,
    //                 "humidity": 0.75,
    //                 "windSpeed": 9.57,
    //                 "windBearing": 227,
    //                 "visibility": 9.85,
    //                 "cloudCover": 0.39,
    //                 "pressure": 1024.87,
    //                 "ozone": 292.19
    //             },
    //             {
    //                 "time": 1484625600,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 33.06,
    //                 "apparentTemperature": 25.58,
    //                 "dewPoint": 26.54,
    //                 "humidity": 0.77,
    //                 "windSpeed": 8.97,
    //                 "windBearing": 229,
    //                 "visibility": 9.7,
    //                 "cloudCover": 0.49,
    //                 "pressure": 1024.66,
    //                 "ozone": 291.42
    //             },
    //             {
    //                 "time": 1484629200,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 32.61,
    //                 "apparentTemperature": 25.13,
    //                 "dewPoint": 26.49,
    //                 "humidity": 0.78,
    //                 "windSpeed": 8.79,
    //                 "windBearing": 231,
    //                 "visibility": 9.58,
    //                 "cloudCover": 0.5,
    //                 "pressure": 1024.45,
    //                 "ozone": 290.6
    //             },
    //             {
    //                 "time": 1484632800,
    //                 "summary": "Mostly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 32.37,
    //                 "apparentTemperature": 25.19,
    //                 "dewPoint": 26.54,
    //                 "humidity": 0.79,
    //                 "windSpeed": 8.17,
    //                 "windBearing": 236,
    //                 "visibility": 9.51,
    //                 "cloudCover": 0.64,
    //                 "pressure": 1024.25,
    //                 "ozone": 289.98
    //             },
    //             {
    //                 "time": 1484636400,
    //                 "summary": "Mostly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 31.61,
    //                 "apparentTemperature": 24.6,
    //                 "dewPoint": 25.92,
    //                 "humidity": 0.79,
    //                 "windSpeed": 7.64,
    //                 "windBearing": 241,
    //                 "visibility": 9.49,
    //                 "cloudCover": 0.6,
    //                 "pressure": 1024.03,
    //                 "ozone": 289.64
    //             },
    //             {
    //                 "time": 1484640000,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 31.08,
    //                 "apparentTemperature": 24.34,
    //                 "dewPoint": 25.3,
    //                 "humidity": 0.79,
    //                 "windSpeed": 7.07,
    //                 "windBearing": 249,
    //                 "visibility": 9.56,
    //                 "cloudCover": 0.55,
    //                 "pressure": 1023.82,
    //                 "ozone": 289.5
    //             },
    //             {
    //                 "time": 1484643600,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 30.32,
    //                 "apparentTemperature": 23.88,
    //                 "dewPoint": 24.36,
    //                 "humidity": 0.78,
    //                 "windSpeed": 6.44,
    //                 "windBearing": 261,
    //                 "visibility": 9.73,
    //                 "cloudCover": 0.5,
    //                 "pressure": 1023.72,
    //                 "ozone": 289.52
    //             },
    //             {
    //                 "time": 1484647200,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 29.7,
    //                 "apparentTemperature": 23.46,
    //                 "dewPoint": 23.52,
    //                 "humidity": 0.77,
    //                 "windSpeed": 6.04,
    //                 "windBearing": 268,
    //                 "visibility": 9.92,
    //                 "cloudCover": 0.5,
    //                 "pressure": 1023.78,
    //                 "ozone": 289.83
    //             },
    //             {
    //                 "time": 1484650800,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 29.12,
    //                 "apparentTemperature": 23.19,
    //                 "dewPoint": 23.15,
    //                 "humidity": 0.78,
    //                 "windSpeed": 5.55,
    //                 "windBearing": 277,
    //                 "visibility": 9.92,
    //                 "cloudCover": 0.47,
    //                 "pressure": 1023.96,
    //                 "ozone": 290.31
    //             },
    //             {
    //                 "time": 1484654400,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-night",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 29.74,
    //                 "apparentTemperature": 24.06,
    //                 "dewPoint": 23.71,
    //                 "humidity": 0.78,
    //                 "windSpeed": 5.4,
    //                 "windBearing": 283,
    //                 "visibility": 9.86,
    //                 "cloudCover": 0.46,
    //                 "pressure": 1024.21,
    //                 "ozone": 290.58
    //             },
    //             {
    //                 "time": 1484658000,
    //                 "summary": "Partly Cloudy",
    //                 "icon": "partly-cloudy-day",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 30.98,
    //                 "apparentTemperature": 26.21,
    //                 "dewPoint": 24.84,
    //                 "humidity": 0.78,
    //                 "windSpeed": 4.65,
    //                 "windBearing": 305,
    //                 "visibility": 9.91,
    //                 "cloudCover": 0.51,
    //                 "pressure": 1024.58,
    //                 "ozone": 290.53
    //             },
    //             {
    //                 "time": 1484661600,
    //                 "summary": "Mostly Cloudy",
    //                 "icon": "partly-cloudy-day",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 32.95,
    //                 "apparentTemperature": 28.47,
    //                 "dewPoint": 25.91,
    //                 "humidity": 0.75,
    //                 "windSpeed": 4.71,
    //                 "windBearing": 326,
    //                 "visibility": 9.93,
    //                 "cloudCover": 0.63,
    //                 "pressure": 1024.91,
    //                 "ozone": 290.28
    //             },
    //             {
    //                 "time": 1484665200,
    //                 "summary": "Mostly Cloudy",
    //                 "icon": "partly-cloudy-day",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 34.97,
    //                 "apparentTemperature": 30.81,
    //                 "dewPoint": 26.88,
    //                 "humidity": 0.72,
    //                 "windSpeed": 4.72,
    //                 "windBearing": 350,
    //                 "visibility": 9.9,
    //                 "cloudCover": 0.7,
    //                 "pressure": 1025.11,
    //                 "ozone": 289.78
    //             },
    //             {
    //                 "time": 1484668800,
    //                 "summary": "Mostly Cloudy",
    //                 "icon": "partly-cloudy-day",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 36.68,
    //                 "apparentTemperature": 32.82,
    //                 "dewPoint": 27.87,
    //                 "humidity": 0.7,
    //                 "windSpeed": 4.71,
    //                 "windBearing": 17,
    //                 "visibility": 9.86,
    //                 "cloudCover": 0.76,
    //                 "pressure": 1025.05,
    //                 "ozone": 288.89
    //             },
    //             {
    //                 "time": 1484672400,
    //                 "summary": "Mostly Cloudy",
    //                 "icon": "partly-cloudy-day",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 39.16,
    //                 "apparentTemperature": 35.14,
    //                 "dewPoint": 29.88,
    //                 "humidity": 0.69,
    //                 "windSpeed": 5.45,
    //                 "windBearing": 42,
    //                 "visibility": 9.8,
    //                 "cloudCover": 0.84,
    //                 "pressure": 1024.84,
    //                 "ozone": 287.75
    //             },
    //             {
    //                 "time": 1484676000,
    //                 "summary": "Mostly Cloudy",
    //                 "icon": "partly-cloudy-day",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 41.73,
    //                 "apparentTemperature": 37.89,
    //                 "dewPoint": 32.61,
    //                 "humidity": 0.7,
    //                 "windSpeed": 5.88,
    //                 "windBearing": 61,
    //                 "visibility": 9.79,
    //                 "cloudCover": 0.91,
    //                 "pressure": 1024.56,
    //                 "ozone": 286.68
    //             },
    //             {
    //                 "time": 1484679600,
    //                 "summary": "Overcast",
    //                 "icon": "cloudy",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 43.51,
    //                 "apparentTemperature": 39.56,
    //                 "dewPoint": 35.51,
    //                 "humidity": 0.73,
    //                 "windSpeed": 6.65,
    //                 "windBearing": 65,
    //                 "visibility": 9.55,
    //                 "cloudCover": 0.95,
    //                 "pressure": 1024.2,
    //                 "ozone": 285.7
    //             },
    //             {
    //                 "time": 1484683200,
    //                 "summary": "Overcast",
    //                 "icon": "cloudy",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 41.28,
    //                 "apparentTemperature": 36.77,
    //                 "dewPoint": 35.04,
    //                 "humidity": 0.78,
    //                 "windSpeed": 6.86,
    //                 "windBearing": 63,
    //                 "visibility": 9.92,
    //                 "cloudCover": 0.95,
    //                 "pressure": 1023.7,
    //                 "ozone": 284.79
    //             },
    //             {
    //                 "time": 1484686800,
    //                 "summary": "Overcast",
    //                 "icon": "cloudy",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 40.85,
    //                 "apparentTemperature": 36.02,
    //                 "dewPoint": 36.08,
    //                 "humidity": 0.83,
    //                 "windSpeed": 7.25,
    //                 "windBearing": 65,
    //                 "visibility": 9.79,
    //                 "cloudCover": 0.97,
    //                 "pressure": 1023.2,
    //                 "ozone": 284.24
    //             },
    //             {
    //                 "time": 1484690400,
    //                 "summary": "Overcast",
    //                 "icon": "cloudy",
    //                 "precipIntensity": 0,
    //                 "precipProbability": 0,
    //                 "temperature": 40.44,
    //                 "apparentTemperature": 35.43,
    //                 "dewPoint": 36.72,
    //                 "humidity": 0.86,
    //                 "windSpeed": 7.42,
    //                 "windBearing": 75,
    //                 "visibility": 8.38,
    //                 "cloudCover": 0.99,
    //                 "pressure": 1022.81,
    //                 "ozone": 283.97
    //             },
    //             {
    //                 "time": 1484694000,
    //                 "summary": "Overcast",
    //                 "icon": "cloudy",
    //                 "precipIntensity": 0.002,
    //                 "precipProbability": 0.05,
    //                 "precipType": "rain",
    //                 "temperature": 39.96,
    //                 "apparentTemperature": 34.37,
    //                 "dewPoint": 37.1,
    //                 "humidity": 0.89,
    //                 "windSpeed": 8.33,
    //                 "windBearing": 87,
    //                 "visibility": 6.11,
    //                 "cloudCover": 0.99,
    //                 "pressure": 1022.44,
    //                 "ozone": 284.07
    //             },
    //             {
    //                 "time": 1484697600,
    //                 "summary": "Drizzle",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0056,
    //                 "precipProbability": 0.24,
    //                 "precipType": "rain",
    //                 "temperature": 39.49,
    //                 "apparentTemperature": 33.36,
    //                 "dewPoint": 37.31,
    //                 "humidity": 0.92,
    //                 "windSpeed": 9.22,
    //                 "windBearing": 93,
    //                 "visibility": 4.48,
    //                 "cloudCover": 0.99,
    //                 "pressure": 1021.96,
    //                 "ozone": 285
    //             },
    //             {
    //                 "time": 1484701200,
    //                 "summary": "Light Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.013,
    //                 "precipProbability": 0.51,
    //                 "precipType": "rain",
    //                 "temperature": 39.06,
    //                 "apparentTemperature": 32.41,
    //                 "dewPoint": 37.38,
    //                 "humidity": 0.94,
    //                 "windSpeed": 10.16,
    //                 "windBearing": 97,
    //                 "visibility": 4.48,
    //                 "cloudCover": 1,
    //                 "pressure": 1021.31,
    //                 "ozone": 287.13
    //             },
    //             {
    //                 "time": 1484704800,
    //                 "summary": "Light Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0228,
    //                 "precipProbability": 0.57,
    //                 "precipType": "rain",
    //                 "temperature": 38.71,
    //                 "apparentTemperature": 31.64,
    //                 "dewPoint": 37.38,
    //                 "humidity": 0.95,
    //                 "windSpeed": 10.93,
    //                 "windBearing": 97,
    //                 "visibility": 5.55,
    //                 "cloudCover": 1,
    //                 "pressure": 1020.54,
    //                 "ozone": 290.1
    //             },
    //             {
    //                 "time": 1484708400,
    //                 "summary": "Light Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0331,
    //                 "precipProbability": 0.62,
    //                 "precipType": "rain",
    //                 "temperature": 38.48,
    //                 "apparentTemperature": 31.1,
    //                 "dewPoint": 37.39,
    //                 "humidity": 0.96,
    //                 "windSpeed": 11.57,
    //                 "windBearing": 94,
    //                 "visibility": 6.12,
    //                 "cloudCover": 1,
    //                 "pressure": 1019.66,
    //                 "ozone": 293.3
    //             },
    //             {
    //                 "time": 1484712000,
    //                 "summary": "Light Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0456,
    //                 "precipProbability": 0.65,
    //                 "precipType": "rain",
    //                 "temperature": 38.48,
    //                 "apparentTemperature": 30.86,
    //                 "dewPoint": 37.52,
    //                 "humidity": 0.96,
    //                 "windSpeed": 12.22,
    //                 "windBearing": 91,
    //                 "visibility": 5.45,
    //                 "cloudCover": 1,
    //                 "pressure": 1018.59,
    //                 "ozone": 297.12
    //             },
    //             {
    //                 "time": 1484715600,
    //                 "summary": "Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0584,
    //                 "precipProbability": 0.68,
    //                 "precipType": "rain",
    //                 "temperature": 38.71,
    //                 "apparentTemperature": 30.92,
    //                 "dewPoint": 37.77,
    //                 "humidity": 0.96,
    //                 "windSpeed": 12.81,
    //                 "windBearing": 88,
    //                 "visibility": 4.3,
    //                 "cloudCover": 1,
    //                 "pressure": 1017.4,
    //                 "ozone": 301.17
    //             },
    //             {
    //                 "time": 1484719200,
    //                 "summary": "Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0639,
    //                 "precipProbability": 0.69,
    //                 "precipType": "rain",
    //                 "temperature": 38.98,
    //                 "apparentTemperature": 31.11,
    //                 "dewPoint": 38.04,
    //                 "humidity": 0.96,
    //                 "windSpeed": 13.25,
    //                 "windBearing": 84,
    //                 "visibility": 3.58,
    //                 "cloudCover": 1,
    //                 "pressure": 1016.27,
    //                 "ozone": 303.63
    //             },
    //             {
    //                 "time": 1484722800,
    //                 "summary": "Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0565,
    //                 "precipProbability": 0.68,
    //                 "precipType": "rain",
    //                 "temperature": 39.4,
    //                 "apparentTemperature": 31.54,
    //                 "dewPoint": 38.47,
    //                 "humidity": 0.96,
    //                 "windSpeed": 13.54,
    //                 "windBearing": 79,
    //                 "visibility": 3.84,
    //                 "cloudCover": 1,
    //                 "pressure": 1015.19,
    //                 "ozone": 303.12
    //             },
    //             {
    //                 "time": 1484726400,
    //                 "summary": "Light Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0417,
    //                 "precipProbability": 0.64,
    //                 "precipType": "rain",
    //                 "temperature": 39.98,
    //                 "apparentTemperature": 32.23,
    //                 "dewPoint": 39.05,
    //                 "humidity": 0.96,
    //                 "windSpeed": 13.68,
    //                 "windBearing": 74,
    //                 "visibility": 4.54,
    //                 "cloudCover": 1,
    //                 "pressure": 1014.17,
    //                 "ozone": 301.02
    //             },
    //             {
    //                 "time": 1484730000,
    //                 "summary": "Light Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0298,
    //                 "precipProbability": 0.6,
    //                 "precipType": "rain",
    //                 "temperature": 40.64,
    //                 "apparentTemperature": 33.11,
    //                 "dewPoint": 39.72,
    //                 "humidity": 0.96,
    //                 "windSpeed": 13.57,
    //                 "windBearing": 69,
    //                 "visibility": 5.06,
    //                 "cloudCover": 1,
    //                 "pressure": 1013.35,
    //                 "ozone": 299.65
    //             },
    //             {
    //                 "time": 1484733600,
    //                 "summary": "Light Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0255,
    //                 "precipProbability": 0.59,
    //                 "precipType": "rain",
    //                 "temperature": 41.32,
    //                 "apparentTemperature": 34.12,
    //                 "dewPoint": 40.4,
    //                 "humidity": 0.96,
    //                 "windSpeed": 13.11,
    //                 "windBearing": 63,
    //                 "visibility": 4.97,
    //                 "cloudCover": 1,
    //                 "pressure": 1012.82,
    //                 "ozone": 299.99
    //             },
    //             {
    //                 "time": 1484737200,
    //                 "summary": "Light Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0241,
    //                 "precipProbability": 0.58,
    //                 "precipType": "rain",
    //                 "temperature": 42.01,
    //                 "apparentTemperature": 35,
    //                 "dewPoint": 41.09,
    //                 "humidity": 0.97,
    //                 "windSpeed": 13.09,
    //                 "windBearing": 59,
    //                 "visibility": 4.7,
    //                 "cloudCover": 1,
    //                 "pressure": 1012.5,
    //                 "ozone": 301.07
    //             },
    //             {
    //                 "time": 1484740800,
    //                 "summary": "Light Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0221,
    //                 "precipProbability": 0.57,
    //                 "precipType": "rain",
    //                 "temperature": 42.72,
    //                 "apparentTemperature": 35.94,
    //                 "dewPoint": 41.8,
    //                 "humidity": 0.97,
    //                 "windSpeed": 12.95,
    //                 "windBearing": 53,
    //                 "visibility": 4.91,
    //                 "cloudCover": 1,
    //                 "pressure": 1012.3,
    //                 "ozone": 302.29
    //             },
    //             {
    //                 "time": 1484744400,
    //                 "summary": "Light Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0175,
    //                 "precipProbability": 0.54,
    //                 "precipType": "rain",
    //                 "temperature": 43.45,
    //                 "apparentTemperature": 36.9,
    //                 "dewPoint": 42.52,
    //                 "humidity": 0.97,
    //                 "windSpeed": 12.85,
    //                 "windBearing": 44,
    //                 "visibility": 6.1,
    //                 "cloudCover": 1,
    //                 "pressure": 1012.26,
    //                 "ozone": 303.55
    //             },
    //             {
    //                 "time": 1484748000,
    //                 "summary": "Light Rain",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0121,
    //                 "precipProbability": 0.5,
    //                 "precipType": "rain",
    //                 "temperature": 44.12,
    //                 "apparentTemperature": 37.71,
    //                 "dewPoint": 43.18,
    //                 "humidity": 0.96,
    //                 "windSpeed": 12.99,
    //                 "windBearing": 34,
    //                 "visibility": 7.78,
    //                 "cloudCover": 1,
    //                 "pressure": 1012.33,
    //                 "ozone": 304.96
    //             },
    //             {
    //                 "time": 1484751600,
    //                 "summary": "Drizzle",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0081,
    //                 "precipProbability": 0.39,
    //                 "precipType": "rain",
    //                 "temperature": 44.63,
    //                 "apparentTemperature": 38.24,
    //                 "dewPoint": 43.63,
    //                 "humidity": 0.96,
    //                 "windSpeed": 13.37,
    //                 "windBearing": 27,
    //                 "visibility": 9.09,
    //                 "cloudCover": 1,
    //                 "pressure": 1012.35,
    //                 "ozone": 306.25
    //             },
    //             {
    //                 "time": 1484755200,
    //                 "summary": "Drizzle",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0067,
    //                 "precipProbability": 0.31,
    //                 "precipType": "rain",
    //                 "temperature": 44.87,
    //                 "apparentTemperature": 38.51,
    //                 "dewPoint": 43.71,
    //                 "humidity": 0.96,
    //                 "windSpeed": 13.47,
    //                 "windBearing": 23,
    //                 "visibility": 9.67,
    //                 "cloudCover": 1,
    //                 "pressure": 1012.16,
    //                 "ozone": 307.45
    //             },
    //             {
    //                 "time": 1484758800,
    //                 "summary": "Drizzle",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0066,
    //                 "precipProbability": 0.3,
    //                 "precipType": "rain",
    //                 "temperature": 44.28,
    //                 "apparentTemperature": 37.81,
    //                 "dewPoint": 42.92,
    //                 "humidity": 0.95,
    //                 "windSpeed": 13.32,
    //                 "windBearing": 20,
    //                 "visibility": 9.89,
    //                 "cloudCover": 1,
    //                 "pressure": 1011.9,
    //                 "ozone": 308.54
    //             },
    //             {
    //                 "time": 1484762400,
    //                 "summary": "Drizzle",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0067,
    //                 "precipProbability": 0.31,
    //                 "precipType": "rain",
    //                 "temperature": 43.29,
    //                 "apparentTemperature": 36.62,
    //                 "dewPoint": 41.8,
    //                 "humidity": 0.94,
    //                 "windSpeed": 13.11,
    //                 "windBearing": 18,
    //                 "visibility": 10,
    //                 "cloudCover": 1,
    //                 "pressure": 1011.79,
    //                 "ozone": 309.11
    //             },
    //             {
    //                 "time": 1484766000,
    //                 "summary": "Drizzle",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0066,
    //                 "precipProbability": 0.3,
    //                 "precipType": "rain",
    //                 "temperature": 42.14,
    //                 "apparentTemperature": 35.17,
    //                 "dewPoint": 40.65,
    //                 "humidity": 0.94,
    //                 "windSpeed": 13.07,
    //                 "windBearing": 16,
    //                 "visibility": 10,
    //                 "cloudCover": 1,
    //                 "pressure": 1011.89,
    //                 "ozone": 308.84
    //             },
    //             {
    //                 "time": 1484769600,
    //                 "summary": "Drizzle",
    //                 "icon": "rain",
    //                 "precipIntensity": 0.0066,
    //                 "precipProbability": 0.3,
    //                 "precipType": "rain",
    //                 "temperature": 41.06,
    //                 "apparentTemperature": 33.81,
    //                 "dewPoint": 39.64,
    //                 "humidity": 0.95,
    //                 "windSpeed": 13.03,
    //                 "windBearing": 16,
    //                 "visibility": 10,
    //                 "cloudCover": 1,
    //                 "pressure": 1012.16,
    //                 "ozone": 308.06
    //             }
    //         ]
    //     },
    //     "daily": {
    //         "summary": "Light rain tomorrow through Monday, with temperatures rising to 47°F on Friday.",
    //         "icon": "rain",
    //         "data": [
    //             {
    //                 "time": 1484542800,
    //                 "summary": "Partly cloudy starting in the afternoon.",
    //                 "icon": "partly-cloudy-night",
    //                 "sunriseTime": 1484568683,
    //                 "sunsetTime": 1484602738,
    //                 "moonPhase": 0.65,
    //                 "precipIntensity": 0,
    //                 "precipIntensityMax": 0,
    //                 "precipProbability": 0,
    //                 "temperatureMin": 23.49,
    //                 "temperatureMinTime": 1484560800,
    //                 "temperatureMax": 40.94,
    //                 "temperatureMaxTime": 1484596800,
    //                 "apparentTemperatureMin": 23.49,
    //                 "apparentTemperatureMinTime": 1484560800,
    //                 "apparentTemperatureMax": 36.09,
    //                 "apparentTemperatureMaxTime": 1484596800,
    //                 "dewPoint": 20.36,
    //                 "humidity": 0.64,
    //                 "windSpeed": 4.74,
    //                 "windBearing": 229,
    //                 "visibility": 9.92,
    //                 "cloudCover": 0.16,
    //                 "pressure": 1028.21,
    //                 "ozone": 286.24
    //             },
    //             {
    //                 "time": 1484629200,
    //                 "summary": "Rain starting in the evening.",
    //                 "icon": "rain",
    //                 "sunriseTime": 1484655052,
    //                 "sunsetTime": 1484689210,
    //                 "moonPhase": 0.68,
    //                 "precipIntensity": 0.0051,
    //                 "precipIntensityMax": 0.0456,
    //                 "precipIntensityMaxTime": 1484712000,
    //                 "precipProbability": 0.65,
    //                 "precipType": "rain",
    //                 "temperatureMin": 29.12,
    //                 "temperatureMinTime": 1484650800,
    //                 "temperatureMax": 43.51,
    //                 "temperatureMaxTime": 1484679600,
    //                 "apparentTemperatureMin": 23.19,
    //                 "apparentTemperatureMinTime": 1484650800,
    //                 "apparentTemperatureMax": 39.56,
    //                 "apparentTemperatureMaxTime": 1484679600,
    //                 "dewPoint": 30.6,
    //                 "humidity": 0.81,
    //                 "windSpeed": 1.8,
    //                 "windBearing": 70,
    //                 "visibility": 8.61,
    //                 "cloudCover": 0.77,
    //                 "pressure": 1023.32,
    //                 "ozone": 288.72
    //             },
    //             {
    //                 "time": 1484715600,
    //                 "summary": "Light rain until evening.",
    //                 "icon": "rain",
    //                 "sunriseTime": 1484741418,
    //                 "sunsetTime": 1484775683,
    //                 "moonPhase": 0.71,
    //                 "precipIntensity": 0.018,
    //                 "precipIntensityMax": 0.0639,
    //                 "precipIntensityMaxTime": 1484719200,
    //                 "precipProbability": 0.69,
    //                 "precipType": "rain",
    //                 "temperatureMin": 38.71,
    //                 "temperatureMinTime": 1484715600,
    //                 "temperatureMax": 44.87,
    //                 "temperatureMaxTime": 1484755200,
    //                 "apparentTemperatureMin": 30.92,
    //                 "apparentTemperatureMinTime": 1484715600,
    //                 "apparentTemperatureMax": 38.51,
    //                 "apparentTemperatureMaxTime": 1484755200,
    //                 "dewPoint": 40.04,
    //                 "humidity": 0.96,
    //                 "windSpeed": 10.78,
    //                 "windBearing": 37,
    //                 "visibility": 7.6,
    //                 "cloudCover": 1,
    //                 "pressure": 1013.62,
    //                 "ozone": 305.35
    //             },
    //             {
    //                 "time": 1484802000,
    //                 "summary": "Mostly cloudy until afternoon.",
    //                 "icon": "partly-cloudy-day",
    //                 "sunriseTime": 1484827782,
    //                 "sunsetTime": 1484862156,
    //                 "moonPhase": 0.74,
    //                 "precipIntensity": 0.0003,
    //                 "precipIntensityMax": 0.0015,
    //                 "precipIntensityMaxTime": 1484802000,
    //                 "precipProbability": 0.03,
    //                 "precipType": "rain",
    //                 "temperatureMin": 33.83,
    //                 "temperatureMinTime": 1484827200,
    //                 "temperatureMax": 46.8,
    //                 "temperatureMaxTime": 1484856000,
    //                 "apparentTemperatureMin": 30.37,
    //                 "apparentTemperatureMinTime": 1484827200,
    //                 "apparentTemperatureMax": 45.07,
    //                 "apparentTemperatureMaxTime": 1484856000,
    //                 "dewPoint": 35.78,
    //                 "humidity": 0.89,
    //                 "windSpeed": 3.35,
    //                 "windBearing": 292,
    //                 "visibility": 10,
    //                 "cloudCover": 0.56,
    //                 "pressure": 1014.82,
    //                 "ozone": 331.5
    //             },
    //             {
    //                 "time": 1484888400,
    //                 "summary": "Mostly cloudy starting in the afternoon.",
    //                 "icon": "partly-cloudy-night",
    //                 "sunriseTime": 1484914145,
    //                 "sunsetTime": 1484948630,
    //                 "moonPhase": 0.77,
    //                 "precipIntensity": 0.0005,
    //                 "precipIntensityMax": 0.0027,
    //                 "precipIntensityMaxTime": 1484971200,
    //                 "precipProbability": 0.08,
    //                 "precipType": "rain",
    //                 "temperatureMin": 31.66,
    //                 "temperatureMinTime": 1484910000,
    //                 "temperatureMax": 47.34,
    //                 "temperatureMaxTime": 1484935200,
    //                 "apparentTemperatureMin": 28.12,
    //                 "apparentTemperatureMinTime": 1484910000,
    //                 "apparentTemperatureMax": 45.31,
    //                 "apparentTemperatureMaxTime": 1484935200,
    //                 "dewPoint": 36.28,
    //                 "humidity": 0.9,
    //                 "windSpeed": 4.09,
    //                 "windBearing": 6,
    //                 "cloudCover": 0.39,
    //                 "pressure": 1015.01,
    //                 "ozone": 309.37
    //             },
    //             {
    //                 "time": 1484974800,
    //                 "summary": "Mixed precipitation in the morning and evening.",
    //                 "icon": "rain",
    //                 "sunriseTime": 1485000505,
    //                 "sunsetTime": 1485035105,
    //                 "moonPhase": 0.8,
    //                 "precipIntensity": 0.0037,
    //                 "precipIntensityMax": 0.0088,
    //                 "precipIntensityMaxTime": 1485054000,
    //                 "precipProbability": 0.44,
    //                 "precipType": "rain",
    //                 "temperatureMin": 33.08,
    //                 "temperatureMinTime": 1484992800,
    //                 "temperatureMax": 45,
    //                 "temperatureMaxTime": 1485028800,
    //                 "apparentTemperatureMin": 26.59,
    //                 "apparentTemperatureMinTime": 1484992800,
    //                 "apparentTemperatureMax": 40.89,
    //                 "apparentTemperatureMaxTime": 1485028800,
    //                 "dewPoint": 37.25,
    //                 "humidity": 0.91,
    //                 "windSpeed": 6.72,
    //                 "windBearing": 22,
    //                 "cloudCover": 1,
    //                 "pressure": 1017.6,
    //                 "ozone": 295.38
    //             },
    //             {
    //                 "time": 1485061200,
    //                 "summary": "Mostly cloudy until evening.",
    //                 "icon": "partly-cloudy-day",
    //                 "sunriseTime": 1485086863,
    //                 "sunsetTime": 1485121580,
    //                 "moonPhase": 0.83,
    //                 "precipIntensity": 0.0013,
    //                 "precipIntensityMax": 0.0074,
    //                 "precipIntensityMaxTime": 1485061200,
    //                 "precipProbability": 0.35,
    //                 "precipType": "rain",
    //                 "temperatureMin": 33.57,
    //                 "temperatureMinTime": 1485144000,
    //                 "temperatureMax": 44.91,
    //                 "temperatureMaxTime": 1485108000,
    //                 "apparentTemperatureMin": 33.57,
    //                 "apparentTemperatureMinTime": 1485144000,
    //                 "apparentTemperatureMax": 42.43,
    //                 "apparentTemperatureMaxTime": 1485108000,
    //                 "dewPoint": 35.62,
    //                 "humidity": 0.84,
    //                 "windSpeed": 3.62,
    //                 "windBearing": 76,
    //                 "cloudCover": 0.7,
    //                 "pressure": 1021.66,
    //                 "ozone": 318.6
    //             },
    //             {
    //                 "time": 1485147600,
    //                 "summary": "Rain starting in the evening.",
    //                 "icon": "rain",
    //                 "sunriseTime": 1485173218,
    //                 "sunsetTime": 1485208056,
    //                 "moonPhase": 0.86,
    //                 "precipIntensity": 0.0045,
    //                 "precipIntensityMax": 0.0261,
    //                 "precipIntensityMaxTime": 1485230400,
    //                 "precipProbability": 0.59,
    //                 "precipType": "rain",
    //                 "temperatureMin": 30.73,
    //                 "temperatureMinTime": 1485172800,
    //                 "temperatureMax": 43.66,
    //                 "temperatureMaxTime": 1485194400,
    //                 "apparentTemperatureMin": 30.73,
    //                 "apparentTemperatureMinTime": 1485172800,
    //                 "apparentTemperatureMax": 39.9,
    //                 "apparentTemperatureMaxTime": 1485194400,
    //                 "dewPoint": 34.32,
    //                 "humidity": 0.83,
    //                 "windSpeed": 5.5,
    //                 "windBearing": 93,
    //                 "cloudCover": 0.65,
    //                 "pressure": 1018.4,
    //                 "ozone": 264.43
    //             }
    //         ]
    //     },
    //     "alerts": [
    //         {
    //             "title": "Winter Weather Advisory for Middlesex, MA",
    //             "time": 1484581620,
    //             "expires": 1484740800,
    //             "description": "...WINTER WEATHER ADVISORY REMAINS IN EFFECT FROM 7 PM TUESDAY TO\n7 AM EST WEDNESDAY...\n* LOCATIONS...INCLUDE PORTIONS OF NORTHERN CONNECTICUT...WESTERN\nAND CENTRAL MASSACHUSETTS...INCLUDING THE METRO AREAS OF\nHARTFORD...SPRINGFIELD...AND WORCESTER.\n* HAZARD TYPES...INCLUDE SNOW...SLEET...AND FREEZING RAIN.\n* ACCUMULATIONS...SNOW ACCUMULATION OF UP TO 1 INCH...ALONG WITH\nAROUND A TRACE OF ICE.\n* TIMING...LATE AFTERNOON TUESDAY THROUGH WEDNESDAY MORNING.\n* IMPACTS...WINTRY PRECIPITATION WILL LIKELY RESULT IN HAZARDOUS\nTRAVEL CONDITIONS ON UNTREATED ROADS...ESPECIALLY BRIDGES...\nAND OVERPASSES. PARKING LOTS AND SIDEWALKS WILL BECOME\nSLIPPERY AS WELL.\n",
    //             "uri": "https://alerts.weather.gov/cap/wwacapget.php?x=MA1258389BC54C.WinterWeatherAdvisory.125838B9C240MA.BOXWSWBOX.ea9f7e22a5ec6960be2b1c3183c42126"
    //         }
    //     ],
    //     "flags": {
    //         "sources": [
    //             "darksky",
    //             "lamp",
    //             "gfs",
    //             "cmc",
    //             "nam",
    //             "rap",
    //             "rtma",
    //             "sref",
    //             "fnmoc",
    //             "isd",
    //             "nwspa",
    //             "madis",
    //             "nearest-precip"
    //         ],
    //         "darksky-stations": [
    //             "KBOX"
    //         ],
    //         "lamp-stations": [
    //             "KASH",
    //             "KBED",
    //             "KBOS",
    //             "KBVY",
    //             "KFIT",
    //             "KLWM",
    //             "KMQE",
    //             "KOWD",
    //             "KPYM",
    //             "KSFZ",
    //             "KTAN"
    //         ],
    //         "isd-stations": [
    //             "725059-14702",
    //             "725059-99999",
    //             "725088-54733",
    //             "725088-99999",
    //             "725090-14739",
    //             "725097-14790",
    //             "725098-54704",
    //             "725098-99999",
    //             "726054-99999",
    //             "744900-14702",
    //             "744907-14753",
    //             "992420-99999",
    //             "994971-99999",
    //             "999999-14789",
    //             "999999-14790",
    //             "999999-94701"
    //         ],
    //         "madis-stations": [
    //             "A1261",
    //             "AN287",
    //             "AV085",
    //             "BHBM3",
    //             "C0210",
    //             "C6612",
    //             "D0056",
    //             "D3706",
    //             "D7355",
    //             "E2727",
    //             "E4331",
    //             "E5351",
    //             "E5650",
    //             "E6480",
    //             "E8528",
    //             "KBOS"
    //         ],
    //         "units": "us"
    //     }
    // };
    //
    // $scope.weatherData = data;



    console.log('Just kidding, using sample weather data for now because CORS');
    
}]);