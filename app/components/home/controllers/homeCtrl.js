(function(){
    'use strict';

    angular.module('parap.home')
    	.controller('HomeCtrl', HomeCtrl);

    

    //HomeCtrl.$inject = ['$state', 'testService'];

    function HomeCtrl($state, $http, User, testService){
	var vm = this;

	//$state.go('home.acceuil');
	vm.compteur = testService.getCpt();
	//vm compteurTR = testService.cpt;
	vm.incr = function(){
	    testService.incrCpt();
	};

	}
	
})();
