'use strict';

var characterControllers = angular.module('characterControllers', []);

characterControllers.controller('TurnAttemptController', ['$scope', '$rootScope', 'DndService', function($scope, $rootScope, DndService) {

	DndService.get().$promise.then(function(data) {
		$scope.skills = data;
	});


	$rootScope.selected = 'stats';
}]);

characterControllers.controller('TurnAttemptController', ['$scope', '$rootScope', 'ClericService', function($scope, $rootScope, ClericService) {

	ClericService.get().$promise.then(function(data) {
			$scope.cleric = data;
			$scope.chaMod = Math.floor((data.charisma - 10)/2);
		}
	);

	$rootScope.selected = 'turnAttempt'

	function getMaxHd() {
		var check = $scope.roll + $scope.chaMod;
		if ($scope.religion) {
			check += 2;
		}
		switch(true) {
			case (check < 1):
				$scope.maxHd = ($scope.cleric.level - 4);
				return;
			case (check > 0 && check < 4):
				$scope.maxHd = ($scope.cleric.level - 3);
				return;
			case (check > 3 && check < 7):
				$scope.maxHd = ($scope.cleric.level - 2);
				return;
			case (check > 6 && check < 10):
				$scope.maxHd = ($scope.cleric.level - 1);
				return;
			case (check > 9 && check < 13):
				$scope.maxHd = ($scope.cleric.level);
				return;
			case (check > 12 && check < 16):
				$scope.maxHd = ($scope.cleric.level + 1);
				return;
			case (check > 15 && check < 19):
				$scope.maxHd = ($scope.cleric.level + 2);
				return;
			case (check > 18 && check < 22):
				$scope.maxHd = ($scope.cleric.level + 3);
				return;
			case (check > 21):
				$scope.maxHd = ($scope.cleric.level + 4);
				return;
		}

	};

	function getDmgRoll() {
		// var dmgRoll = Math.floor((Math.random()*11) + 2);
		var dmgRoll = $scope.rollDmg;
		$scope.dmgRoll = ($scope.chaMod + $scope.cleric.level + dmgRoll);
		$scope.dmgLeft = $scope.dmgRoll;
	};

	$scope.calculate = function() {
		getMaxHd();
		getDmgRoll();
		$scope.result = true;
		if ($scope.greaterTurn) {
			$scope.counter = 2;
			$scope.img = images[$scope.counter];
			$scope.skellyImgLeft = skellyLeft[$scope.counter];
			$scope.skellyImgRight = skellyRight[$scope.counter];
		} else {
			$scope.counter = 1;
			$scope.img = images[$scope.counter];
			$scope.skellyImgLeft = skellyLeft[$scope.counter];
			$scope.skellyImgRight = skellyRight[$scope.counter];
		}
	};

	$scope.updateDmgLeft = function(creatureHD) {
		$scope.dmgLeft = $scope.dmgLeft - creatureHD;
	};

	$scope.getNextImage = function() {
		if ($scope.counter < 2) {
			$scope.counter++;
		}
		else {
			$scope.counter = 0;
		}
		$scope.img = images[$scope.counter];
		$scope.skellyImgLeft = skellyLeft[$scope.counter];
		$scope.skellyImgRight = skellyRight[$scope.counter];
	}

	var images = ['pics/cleric.png', 'pics/clericturning.png', 'pics/cleric3.png'];

	var skellyLeft = ['pics/skellyLeft.png', 'pics/skellyRight.png', 'pics/dust.png'];

	var skellyRight = ['pics/skellyRight.png', 'pics/skellyLeft.png', 'pics/dust.png'];

	$scope.dmgLeft = 0;

	$scope.result = false;

	$scope.dmgRoll = 0;

	$scope.counter = 0;

	$scope.img = images[$scope.counter];

	$scope.skellyImgLeft = skellyLeft[$scope.counter];

	$scope.skellyImgRight = skellyRight[$scope.counter];

	$rootScope.selected = 'turnAttempt';
}]);

characterControllers.controller('BuffsController', ['$scope', '$rootScope', 'ClericService', function($scope, $rootScope, ClericService) {

	var originalBAB = 0;
	var sizeCat = 0;
	var saveMod = 0;
	var atkMod = 0;
	var dmgMod = 0;
	$scope.grapple = 0;
	$scope.fort = 0;
	$scope.reflex = 0;
	$scope.will = 0;
	$scope.attack = 0;
	$scope.thDmg = 0;

	ClericService.get().$promise.then(function(data) {
		$scope.cleric = data;
		$scope.strMod = Math.floor((data.strength - 10)/2);
		$scope.dexMod = Math.floor((data.dexterity - 10)/2);
		$scope.conMod = Math.floor((data.constitution - 10)/2);
		$scope.intMod = Math.floor((data.intelligence - 10)/2);
		$scope.wisMod = Math.floor((data.wisdom - 10)/2);
		$scope.chaMod = Math.floor((data.charisma - 10)/2);
		originalBAB = data.bab;
		$scope.setStats();
	});

	$scope.mightUpdate = function() {
		if ($scope.might) {
			$scope.cleric.strength += 4;
			$scope.cleric.constitution += 2;
			$scope.cleric.ac += 1;
			sizeCat += 1;
		} else {
			$scope.cleric.strength -= 4;
			$scope.cleric.constitution -= 2;
			$scope.cleric.ac -= 1;
			sizeCat -= 1;
		}
		$scope.strMod = Math.floor(($scope.cleric.strength - 10)/2);
		$scope.conMod = Math.floor(($scope.cleric.constitution - 10)/2);
		$scope.setStats();
	}

	$scope.wrathUpdate = function() {
		if ($scope.wrath) {
			atkMod += 3;
			dmgMod += 3;
		} else {
			atkMod -= 3;
			dmgMod -= 3;
		}
		$scope.setStats();
	}

	$scope.holyUpdate = function() {
		if ($scope.holy) {
			$scope.cleric.strength += 2;
			$scope.cleric.constitution += 2;
			saveMod += 2;
		} else {
			$scope.cleric.strength -= 2;
			$scope.cleric.constitution -= 2;
			saveMod -= 2;
		}
		$scope.strMod = Math.floor(($scope.cleric.strength - 10)/2);
		$scope.conMod = Math.floor(($scope.cleric.constitution - 10)/2);
		$scope.setStats();
	}

	$scope.powerUpdate = function() {
		if ($scope.power) {
			$scope.cleric.strength += 6;
			$scope.cleric.bab = $scope.cleric.level;
		} else {
			$scope.cleric.strength -= 6;
			$scope.cleric.bab = originalBAB;
		}
		$scope.strMod = Math.floor(($scope.cleric.strength - 10)/2);
		$scope.setStats();
	}

	$scope.setStats = function() {
		$scope.grapple = $scope.cleric.bab + $scope.strMod + (sizeCat*4);
		$scope.fort = $scope.cleric.baseFortitude + $scope.conMod + saveMod;
		$scope.reflex = $scope.cleric.baseReflex + $scope.dexMod + saveMod;
		$scope.will = $scope.cleric.baseWill + $scope.wisMod + saveMod;
		$scope.attack = $scope.cleric.bab + $scope.strMod + atkMod;
		$scope.thDmg = Math.floor($scope.strMod * 1.5 + dmgMod);
	}

	$rootScope.selected = 'buffs';
}]);
