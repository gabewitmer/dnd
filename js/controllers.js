'use strict';

var characterControllers = angular.module('characterControllers', []);

characterControllers.controller('TurnAttemptController', ['$scope', '$rootScope', 'DndService', function($scope, $rootScope, DndService) {

	DndService.get().$promise.then(function(data) {
		$scope.skills = data;
	});


	$rootScope.selected = 'stats';
}]);
