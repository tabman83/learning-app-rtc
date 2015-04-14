;(function(angular, undefined) {
    'use strict';
    
    angular.module('LearningApp').factory('VideoStream', ['$window', '$q', function($window, $q) {
        var cachedStream;
        var getUserMedia = ($window.navigator.getUserMedia || $window.navigator.webkitGetUserMedia || $window.navigator.mozGetUserMedia).bind($window.navigator);

        return {
            get: function () {
                if (cachedStream) {
                    return $q.when(cachedStream);
                } else {
                    var deferred = $q.defer();
                    getUserMedia({
                        video: true,
                        audio: true
                    }, function (stream) {
                        cachedStream = stream;
                        deferred.resolve(cachedStream);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                }
            }
        };
    }]);

})(angular);
