(function(){

    'use strict';

    angular.module('pietro.authentication')
	.factory('UserAuthFactory', UserAuthFactory);

    function UserAuthFactory($q, $location, USER_AUTH_CST, localStorageService){

	var UserAuth = {
	    authenticated: getToken() != null ? true : false,
	    isAuthenticated: isUserAuthenticated,
	    connectUser: userConnected,
	    isConnected: checkIsConnected,
	    getToken: getToken,
	    getUserName: getUserName,
	    getUserData: getUsrData,
	    checkModuleAccess: checkAccess
	};

	return UserAuth;


	/**
	 * Setter for user connection
	 */
	function userConnected(value){
	    if (value)
		UserAuth.authenticated = true;
	    else
		UserAuth.authenticated = false;
	}

	/**
	 * Getter for user connection
	 */
	function isUserAuthenticated(){
	    return UserAuth.authenticated;
	}
	/**
	 * Return the token used for backend connection from the connected user
	 */
	
	function getToken(){
	    return localStorageService.get(USER_AUTH_CST.token);
	}

	function getUserName(){
	    if (UserAuth.authenticated && UserAuth.getUserData())
		return UserAuth.getUserData().name;

	    return null;
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
		UserAuth.authenticated = true;
	    }
	    
	    return defered.promise;
	}

	/**
	 * Return the user data json array of the connected user
	 */
	function getUsrData(){
	    if (UserAuth.authenticated == false)
		return null;

	    return localStorageService.get(USER_AUTH_CST.userData);
	}

	/**
	 * check if connected user can access to modname
	 */
	function checkAccess(modName){
	    if (UserAuth.authenticated)
		for (var i = 0; i<UserAuth.getUserData().profile.module.length; ++i)
		    if (UserAuth.getUserData().profile.module[i].name == modName)
			return true;


	    return false;
	}

    }

    
})();
