(function(){
    'use strict';
    
    angular.module('pietro.authentication')
	.factory('AuthenticationFactory', AuthenticateWithToken);
    
    
    function AuthenticateWithToken($rootScope, $http, $q, localStorageService){

	var keyToken = "token";
	var keyAccess = "access";
	
	var authenticationService = {
	    isAuthenticated: false,
	    user: {},
	    
	    login: login,
	    logout: logout
	};
	
	return authenticationService;
	
	////Definitions
	
	function login (credentials){

	    return $http.post('/authenticate', credentials).then(
		function(res){
		    if (res.status == 200){
			localStorageService.set(keyToken, res.data.token);
			localStorageService.set(keyAccess, res.data.access);
			authenticationService.isAuthenticated = true;
			$rootScope.$broadcast('authenticationSuccess', credentials.name);
		    }
		    return res;
		})
	};
	
	function logout(){
	    authenticationService.isAuthenticated = false;
	    localStorageService.remove(keyToken, keyAccess);
	    $rootScope.$broadcast('deauthenticationSuccess', "yeessss");
	};
    };
    
})();

