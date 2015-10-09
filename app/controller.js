(function(){
    'use strict';

    angular.module('parap')
	.controller('ParapCtrl', ParapCtrl);




    

    //ParapCtrl.$inject = ['$window', 'LocalStorageModule'];
    function ParapCtrl($rootScope,
		       $http,
		       $state,
		       $window,
		       localStorageService,
		       AuthenticationFactory,
		       UserAuthFactory,
		       MESSAGES_AUTH_CST
		      ){
	var vm = this;
	vm.messages = [];
	vm.isAuthenticated ;
	vm.userAuthenticated;
	
	vm.checkModuleAccess = function(moduleName){
	    if (vm.isAuthenticated && vm.userAuthenticated != null){
		if (vm.userAuthenticated.profil.module.indexOf(moduleName) != -1)
		    return true;		
	    }
	    return false;
	}

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
	
	$rootScope.$on(MESSAGES_AUTH_CST.authSuccess, function(event, arg){
	    vm.isAuthenticated = true;
	    vm.userAuthenticated = arg;
	    vm.messages.push({ class: "alert alert-success", event: "Utilisateur " + arg });
	});
		       
	$rootScope.$on(MESSAGES_AUTH_CST.authLogOut, function(event, arg){
	    vm.isAuthenticated = false;
	    vm.userAuthenticated;
	});
	
	$rootScope
	    .$on('information', function(event, arg){
		vm.messages.push({ class: "alert alert-success", event: arg });
	    })
	$rootScope
	    .$on('error', function(event, arg){
		vm.messages.push({ class: "alert alert-danger", event: arg });
	    });



	if (!localStorageService.isSupported){
	    vm.errorMessage = "Web storage is not available through your browser.";
	}
	
    }
})();
