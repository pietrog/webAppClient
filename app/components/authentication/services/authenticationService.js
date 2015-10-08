(function(){
    'use strict';
    
    angular.module('pietro.authentication')
	.factory('AuthenticationFactory', AuthenticateWithToken);


    function AuthenticateWithToken($rootScope, $http, $q, $location, localStorageService, USER_AUTH){

	var authenticationService = {
	    user: {},
	    login: login,
	    logout: logout,
	    
	};
	
	return authenticationService;
	
	////Definitions
	
	function login (credentials){

	    return $http.post('/authenticate', credentials).then(
		function(res){

		    //if successful, store the token
		    if (res.status == 200){
			localStorageService.set(USER_AUTH.token, res.data.token);
			localStorageService.set(USER_AUTH.userName, credentials.name);
			$rootScope.$broadcast('authenticationSuccess', credentials.name);
		    }
		    return res;
		})
	};
	
	function logout(){
	    localStorageService.remove(USER_AUTH.token);
	    localStorageService.remove(USER_AUTH.name);
	    $rootScope.$broadcast('deauthenticationSuccess', "yeessss");
	};

    };
    
})();

