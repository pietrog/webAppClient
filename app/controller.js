(function(){
    'use strict';

    angular.module('parap')
	.controller('ParapCtrl', ParapCtrl);


    //ParapCtrl.$inject = ['$window', 'LocalStorageModule'];
    function ParapCtrl($rootScope, $state, $window, localStorageService, AuthenticationFactory){
	var vm = this;
	vm.errorMessage;
	vm.infos = {};
	//vm.logout = AuthenticationFactory.logout();
	vm.logout = function(){
	    if (vm.isAuthenticated)
		AuthenticationFactory.logout();
	}
	
	$rootScope.$on('authenticationSuccess', function(event, arg){
	    vm.isAuthenticated = true;
	    vm.name = arg;
	});
		       
	$rootScope.$on('deauthenticationSuccess', function(event, arg){
	    vm.name = "OUUUT";
	    vm.isAuthenticated = false;
	});

	$rootScope.$on('information', function(event, arg){
	    vm.infos = { name: arg }
	});
	

	if (!localStorageService.isSupported){
	    vm.errorMessage = "Web storage is not available through your browser.";
	}
	
    }
})();
