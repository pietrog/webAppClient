(function(){
    'use strict';
    
    angular.module('pietro.authentication')
	.factory('AuthenticationFactory', AuthenticateWithToken);


    function AuthenticateWithToken($rootScope, $http, $q, $location, localStorageService,
				   UserAuthFactory,
				   USER_AUTH_CST,
				   MESSAGES_AUTH_CST){

	var authenticationService = {
	    login: login,
	    logout: logout,
	};
	
	return authenticationService;
	
	//Login the user with credentials9 {name: xxx, password: xxx})
	//Broadcast also an authSuccess message with the user name
	function login (credentials){
	    return $http.post('/authenticate', credentials).then(
		function(res){
		    //if successful, store the token
		    if (res.status == 200){
			var userData = {
			    name: credentials.name,
			    profile: res.data.data.profile,
			    //profile: { module: ["patient"] },
			    lastAccess: res.data.data.lastAccess
			};
			localStorageService.set(USER_AUTH_CST.token, res.data.data.token);
			localStorageService.set(USER_AUTH_CST.userData, userData);
			UserAuthFactory.connectUser(true);
			$rootScope.$emit(MESSAGES_AUTH_CST.authSuccess, userData.name);
		    }
		    return res;
		})
	};
	
	function logout(withoutMessage){
	    if (UserAuthFactory.isConnected()){
		if (!withoutMessage)
		    $rootScope.$emit(MESSAGES_AUTH_CST.authLogOut, UserAuthFactory.getUserName());
		UserAuthFactory.connectUser(false);
		localStorageService.remove(USER_AUTH_CST.token);
		localStorageService.remove(USER_AUTH_CST.userData);
	    }
	};

    };
    
})();

