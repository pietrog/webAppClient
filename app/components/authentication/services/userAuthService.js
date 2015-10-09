(function(){

    'use strict';

    angular.module('pietro.authentication')
	.factory('UserAuthFactory', UserAuthFactory);

    function UserAuthFactory($q, $location, USER_AUTH_CST, localStorageService){

	var UserAuth = {
	    isAuthenticated: false,
	    isConnected: checkIsConnected,
	    getToken: getToken
	};

	return UserAuth;

	function getToken(){
	    return localStorageService.get(USER_AUTH_CST.token);
	}
	
	function checkIsConnected(){
	    var defered = $q.defer();
	    
	    var token = localStorageService.get(USER_AUTH_CST.token);

	    if (!token){
		defered.reject("no access");
		$location.url('/home');
	    }
	    else{
		defered.resolve("access granted !");
		UserAuth.isAuthenticated = true;
	    }
	    
	    return defered.promise;
	}

    }

    
})();
