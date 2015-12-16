(function(){
    'use strict';

    angular.module('parap.home')
    	.controller('HomeCtrl', HomeCtrl);

    

    //HomeCtrl.$inject = ['$state', 'testService'];

    function HomeCtrl(UserAuthFactory){
	var vm = this;

	vm.toDisplay = UserAuthFactory.getToken();
	//$state.go('home.acceuil');
	
    }
	
})();
