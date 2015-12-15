(function(){
    'use strict';

    angular.module('pietro.authentication')
	.controller('UserLoginCtrl', UserLoginCtrl);

    //UserLoginCtrl.$inject = ['AuthenticationFactory'];
    function UserLoginCtrl($rootScope,
			   AuthenticationFactory,
			   UserAuthFactory,
			   MESSAGES_AUTH_CST
			  ){
	var vm = this;

	vm.credentials = {};

	vm.userAuth = UserAuthFactory;

	vm.login = function(){
	    AuthenticationFactory.login(vm.credentials).then(
		function(response){
		    $rootScope.$broadcast(MESSAGES_AUTH_CST.authSuccess, vm.credentials);
		    vm.result = response.data;
		},
		function(response){
		    $rootScope.$broadcast(MESSAGES_AUTH_CST.authFail, vm.credentials);
		}
	    );
	}

	vm.checkModuleAccess = function(moduleName){
	    if (UserAuthFactory.isAuthenticated()){
		if (UserAuthFactory.getUserData().profile.module){
		    /*UserAuthFactory.getUserData().profile.module.forEach(function(curr, idx, array){
			if (curr.name == moduleName)
			    return true;
			    })*/
		    for (var i = 0; i<UserAuthFactory.getUserData().profile.module.length; ++i)
			if (UserAuthFactory.getUserData().profile.module[i].name == moduleName)
			    return true;
		}
	    }
	    return false;
	}

	vm.logout = function(){
	    AuthenticationFactory.logout();
	}


	
    }
})();
