(function(){
    'use strict';

    angular.module('parap')
	.controller('ParapCtrl', ParapCtrl);




    

    //ParapCtrl.$inject = ['$window', 'LocalStorageModule'];
    function ParapCtrl($rootScope, $http, $state, $window, localStorageService, AuthenticationFactory, UserAuthFactory){
	var vm = this;
	vm.errorMessage;
	vm.infos = [];

	//check if a user is connected
	UserAuthFactory.isConnected().then(
	    function(res){
		$rootScope.$broadcast('information', "user connected ! "+ res);
		$rootScope.$broadcast('authenticationSuccess');
		vm.isAuthenticated = false;
	    },
	    function(err){
		$rootScope.$broadcast('error', "user not connected ! "+ err);
	    }
	);
	
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
	    vm.isAuthenticated = false;
	});
	
	$rootScope
	    .$on('information', function(event, arg){
		vm.infos.push({ class: "alert alert-success", event: arg });
	    })
	$rootScope
	    .$on('error', function(event, arg){
		vm.infos.push({ class: "alert alert-danger", event: arg });
	    });



	if (!localStorageService.isSupported){
	    vm.errorMessage = "Web storage is not available through your browser.";
	}
	
    }
})();
