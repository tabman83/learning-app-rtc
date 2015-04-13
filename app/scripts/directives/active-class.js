;(function(angular, undefined) {

	angular.module('LearningApp').directive('activeClass', [function() {

		return {
			link: function(scope, element, attrs) {

				var anchorLink = element.find('a')[0].getAttribute('ng-href') || element.find('a')[0].getAttribute('href');
				anchorLink = anchorLink.replace(/^#/, '');
				scope.$on("$routeChangeSuccess", function (event, current) {
					if (current.$$route && current.$$route.originalPath == anchorLink) {
						element.addClass(attrs.activeClass);
					}
					else {
						element.removeClass(attrs.activeClass);
					}
				});
			}
		};

	}]);

})(angular);
