angular.module('services').factory('geoLocation', function($q, $timeout) {
  // TODO: Enhance this service to use a GeoLocation API such as the Google maps API
  // https://developers.google.com/maps/documentation/javascript/geocoding

  // For now just hardcoding the lat/long for our test cities
  return function(city) {
    var latLong = null;
    var deferred = $q.defer();

    // Use a $q resolved to simulate a $http call that returns a promise
    $timeout(function() {
      switch (city.toLowerCase()) {
        case "seattle":
          deferred.resolve([47.6062,-122.3321]);
          break;
        case "london":
          deferred.resolve([51.5171,-0.1062]);
          break;
        case "tokyo":
          deferred.resolve([35.6832,139.8089]);
          break;
        case "new york":
          deferred.resolve([40.7142,-74.0064]);
          break;
        case "los angeles":
          deferred.resolve([34.0535, -118.2453]);
          break;
        default:
          deferred.reject("Invalid city");
      }
    }, 20);
    return deferred.promise;
  };
});
