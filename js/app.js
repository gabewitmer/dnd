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

		.when('/turning', {
			templateUrl: 'pages/turning.html',
			controller: 'TurnAttemptController'
		})

		.when('/mogdin', {
			templateUrl: 'pages/mogdin.html',
			controller: 'BuffsController'
		})

		.when('/charSheet2', {
			templateUrl: 'pages/charSheet2.html',
			controller: 'TurnAttemptController'
		})

}]);
