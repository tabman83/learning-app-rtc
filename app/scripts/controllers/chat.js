(function(angular, undefined) {

	angular.module('LearningApp').controller('ChatCtrl', ['$window', '$scope', '$location', 'VideoStream', 'Room', function($window, $scope, $location, VideoStream, Room) {

		var URL = $window.URL || $window.mozURL || $window.webkitURL;
		var cachedStream;

	    VideoStream.get().then(function (stream) {
			cachedStream = stream;
	      	Room.init(cachedStream);
			cachedStream = URL.createObjectURL(cachedStream);
	        Room.createRoom().then(function (roomId) {});
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
			return $sce.trustAsResourceUrl(stream);
		};

	}]);

})(angular);
