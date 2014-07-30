angular.module('Yelp', ['ngResource']);

function YelpCtrl($scope, $resource) {
	$scope.yelp = $resource("http://api.yelp.com/:action", {
		action: 'business_review_search',
		term: encodeURIComponent('chinese'),
		location: encodeURIComponent('San Francisco'),
		ywsid: 'oQcjRFaFtJ6xs4_sxLUHyg',
		callback: 'JSON_CALLBACK'
	}, {
		get: {
			method: 'JSONP'
		}
	});
	$scope.doSearch = function() {
		$scope.yelpResult = $scope.yelp.get();
	}
}