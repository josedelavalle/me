var app = angular.module('jdApp', ['ngMap', 'ngResource']);

app.service('VisitorService', function ($resource) {
	return $resource('assets/visitors.json');
});

app.controller('jdController', ['$scope', 'NgMap', 'VisitorService', function($scope, NgMap, VisitorService) {
	console.log('jdController', Date());
	var heatmap, vm = this;
	var getVisitors = function() {
		VisitorService.get().$promise.then(function(res) {
			$scope.heatmapData = res.data.map(function(item) {
				if (item[0] != 0 && item[1] != 0) {
					return new google.maps.LatLng(item[0], item[1]);
				}
			});

			NgMap.getMap().then(function(map) {
			    vm.map = map;
			    heatmap = vm.map.heatmapLayers.heatmap;
			});
			
		});
		
	};
	getVisitors();

	$scope.toggleMap = function() {
		$scope.showMap = !$scope.showMap;
		NgMap.getMap().then(function(map) {
	      map.setCenter(new google.maps.LatLng(20,0));
	    });
	};
	
}]);