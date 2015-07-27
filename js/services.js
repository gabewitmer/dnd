'use strict';

var services = angular.module('services', ['ngResource']);

services.factory('DndService', ['$resource', '$timeout', function($resource, $timeout) {
	return $resource('skills.json');
}]);

services.factory('ClericService', ['$resource', '$timeout', function($resource, $timeout) {
	return $resource('cleric.json');
}]);
