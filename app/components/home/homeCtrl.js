(function(){
    'use strict';

    angular.module('parap.home')
    	.controller('parap.HomeCtrl', HomeCtrl);

    

    HomeCtrl.$inject = ['$state'];

    function HomeCtrl($state, $http, User){
	var vm = this;

	//$state.go('home.acceuil');

	}
	
})();
