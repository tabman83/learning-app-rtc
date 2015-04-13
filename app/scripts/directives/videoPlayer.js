;(function(angular, undefined) {

	angular.module('LearningApp').directive('videoPlayer', ['$sce', function ($sce) {
        return {
            template: '<div><video ng-src="" autoplay></video></div>',
            restrict: 'E',
            replace: true,
            scope: {
                vidSrc: '@'
            },
            link: function (scope) {
                console.log('Initializing video-player');
                scope.trustSrc = function () {
                    if (!scope.vidSrc) {
                        return undefined;
                    }
                    return $sce.trustAsResourceUrl(scope.vidSrc);
                };
            }
        };

	}]);

})(angular);
