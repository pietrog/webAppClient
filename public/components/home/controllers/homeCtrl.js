(function(){
    'use strict';

    angular.module('parap.home')
    	.controller('HomeCtrl', HomeCtrl);

    

    //HomeCtrl.$inject = ['$state', 'testService'];

    function HomeCtrl($rootScope, UserAuthFactory){
	var vm = this;
	vm.ctname = "HomeCtrl";
	vm.toDisplay = UserAuthFactory.getToken();
	//$state.go('home.acceuil');
	vm.obj = $rootScope.obj;
	
    }
	
})();
