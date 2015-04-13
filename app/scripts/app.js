;(function(angular, undefined) {

	// app initialization
	angular.module('LearningApp', ['ngRoute', 'ngResource']);

	// app configuration
	angular.module('LearningApp').config(['$routeProvider', function($routeProvider) {

		$routeProvider.whenAuthenticated = function (path, route) {
            route.resolve = route.resolve || {};
            angular.extend(route.resolve, {
				userInfo: ['$rootScope', 'User', function($rootScope, User) {
                    $rootScope.user = User.get();
                    return $rootScope.user.$promise;
	        	}]
			});
            return $routeProvider.when(path, route);
        }

		// configure router
		$routeProvider.whenAuthenticated('/Chat', {
			templateUrl: 'views/chat.html',
			controller: 'ChatCtrl'
		}).whenAuthenticated('/About', {
			templateUrl: 'views/about.html',
			controller: 'AboutCtrl'
		}).when('/Login', {
			templateUrl: 'views/login.html',
			controller: 'LoginCtrl'
		}).otherwise({
			redirectTo: '/Chat'
		});

	}]);

	// app running
	angular.module('LearningApp').run(['$location', '$rootScope', '$log', function($location, $rootScope, $log) {

		$rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            console.log(rejection);
            if (rejection && rejection.status === 401) {
                var returnUrl = $location.url();
                $log.log('returnUrl=' + returnUrl);
                $location.path('/Login').search({ returnUrl: returnUrl });
            }
        });

	}]);

})(angular);
