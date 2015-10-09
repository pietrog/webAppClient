(function(){
    'use strict';
    
    angular.module('pietro.authentication')
	.factory('AuthenticationFactory', AuthenticateWithToken);


    function AuthenticateWithToken($rootScope, $http, $q, $location, localStorageService,
				   USER_AUTH_CST,
				   MESSAGES_AUTH_CST){

	var authenticationService = {
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
			var userData = {
			    name: credentials.login,
			    //profil: res.data.profil,
			    profil: { module: ["patient"] },
			    lastAccess: res.data.lastAccess
			};
			localStorageService.set(USER_AUTH_CST.token, res.data.token);
			localStorageService.set(USER_AUTH_CST.userData, userData);
			$rootScope.$broadcast(MESSAGES_AUTH_CST.authSuccess, userData);
		    }
		    return res;
		})
	};
	
	function logout(){
	    localStorageService.remove(USER_AUTH_CST.token);
	    localStorageService.remove(USER_AUTH_CST.userData);
	    $rootScope.$broadcast('deauthenticationSuccess', "yeessss");
	};

    };
    
})();

