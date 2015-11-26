(function(){

    'use strict';

    angular.module('pietro.authentication')
	.factory('UserAuthFactory', UserAuthFactory);

    function UserAuthFactory($q, $location, USER_AUTH_CST, localStorageService){

	var UserAuth = {
	    _isAuthenticated: false,
	    isAuthenticated: isUserAuthenticated,
	    connectUser: userConnected,
	    isConnected: checkIsConnected,
	    getToken: getToken,
	    getUserData: getUsrData
	};

	return UserAuth;


	/**
	 * Setter for user connection
	 */
	function userConnected(value){
	    if (value)
		UserAuth._isAuthenticated = true;
	    else
		UserAuth._isAuthenticated = false;
	}

	/**
	 * Getter for user connection
	 */
	function isUserAuthenticated(){
	    return UserAuth._isAuthenticated;
	}
	/**
	 * Return the token used for backend connection from the connected user
	 */
	
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

	/**
	 * Return the user data json array of the connected user
	 */
	function getUsrData(){
	    if (UserAuth.isAuthenticated == false)
		return null;

	    return localStorageService.get(USER_AUTH_CST.userData);
	}

    }

    
})();
