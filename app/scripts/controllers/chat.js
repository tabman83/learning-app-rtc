(function(angular, undefined) {
	'use strict';

	angular.module('LearningApp').controller('ChatCtrl', ['$window', '$scope', '$location', '$routeParams', '$sce', 'VideoStream', 'Room', function($window, $scope, $location, $routeParams, $sce, VideoStream, Room) {

		var URL = $window.URL || $window.mozURL || $window.webkitURL;
		var cachedStream;

	    VideoStream.get().then(function (stream) {
			cachedStream = stream;
	      	Room.init(cachedStream);
			cachedStream = URL.createObjectURL(cachedStream);
			if (!$routeParams.roomId) {
        		Room.createRoom().then(function (roomId) {
          			$location.path('/Chat/' + roomId);
        		});
      		} else {
        		Room.joinRoom($routeParams.roomId);
      		}
	    }, function () {
	      $scope.error = 'No audio/video permissions. Please refresh your browser and allow the audio/video capturing.';
	    });
	    $scope.peers = [];
	    Room.on('peer.stream', function (peer) {
			console.log('Client connected, adding new stream');
			$scope.peers.push({
				id: peer.id,
				stream: URL.createObjectURL(peer.stream)
			});
		});
		Room.on('peer.disconnected', function (peer) {
			console.log('Client disconnected, removing stream');
			$scope.peers = $scope.peers.filter(function (p) {
				return p.id !== peer.id;
			});
		});

		$scope.getLocalVideo = function () {
			return $sce.trustAsResourceUrl(cachedStream);
		};

	}]);

})(angular);
