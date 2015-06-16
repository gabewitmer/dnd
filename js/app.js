'use strict';

var clericApp = angular.module('clericApp', [
	'ngRoute',
	'characterControllers',
	'services',
]);

clericApp.config(['$routeProvider', function(routeProvider) {
	routeProvider
		.when('/', {
			templateUrl: 'pages/dnd.html',
			controller: 'TurnAttemptController'    //controllers are always capitalized
		})

		.when('/skills', {
			templateUrl: 'pages/skills.html',
			controller: 'TurnAttemptController'
		})

		.when('/charSheet', {
			templateUrl: 'pages/charSheet.html',
			controller: 'TurnAttemptController'
		})

}]);
