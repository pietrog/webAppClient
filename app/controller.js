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
	
	vm.checkModuleAccess = function(moduleName){
	    if (UserAuthFactory.isAuthenticated()){
		if (UserAuthFactory.getUserData.profile.module){
		    UserAuthFactory.getUserData.profile.module.forEach(function(curr, idx, array){
			if (curr.name == moduleName)
			    return true;
		    })
		}
	    }
	    return false;
	}

	//check if a user is connected
	UserAuthFactory.isConnected().then(
	    function(res){
		$rootScope.$broadcast('information', "user connected ! "+ res);
	    },
	    function(err){
		$rootScope.$broadcast('error', "user not connected ! "+ err);
	    }
	);
	
	vm.logout = AuthenticationFactory.logout();

	$rootScope.$on(MESSAGES_AUTH_CST.authSuccess, function(event, arg){
	    vm.messages.push({ class: "alert alert-success", event: arg.name + " est maintenant connecte" });
	});
	$rootScope.$on(MESSAGES_AUTH_CST.authFail, function(event, arg){
	    vm.messages.push({ class: "alert alert-success", event: "Echec de connection" });
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
