;(function(angular, undefined) {
    'use strict';
    
    angular.module('LearningApp').factory('User', ['$resource', function($resource){
        return $resource( '//localhost:4000/api/user/:userId', { userId: '@id' } );
    }]);

})(angular);
