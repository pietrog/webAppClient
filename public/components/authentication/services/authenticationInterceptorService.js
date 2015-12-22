(function(){

    'use strict';

    angular.module('pietro.authentication')
	.factory('AuthenticationInterceptorFactory', AuthenticationInterceptorFactory);

    function AuthenticationInterceptorFactory($q, $rootScope, localStorageService, UserAuthFactory, MESSAGES_AUTH_CST){

	var AuthenticationInterceptor = {
	    request: RequestInterceptor,
	    requestError: RequestErrorInterceptor,
	    response: ResponseInterceptor,
	    responseError: ResponseErrorInterceptor
	    
	};

	return AuthenticationInterceptor;


	function RequestInterceptor(config){
	    var token = UserAuthFactory.getToken();
	    if (token){
		config.headers = config.headers || {};
		config.headers['x-access-token'] = token;
	    }
	    return config;
	}

	function RequestErrorInterceptor(rejection){
	    return rejection;
	}


	function ResponseInterceptor (response){
	    //$rootScope.obj = response;
	    //$rootScope.$broadcast(MESSAGES_AUTH_CST.authExpired, "Vous devez vous reconnecter");
	    return response;
	}
	
	function ResponseErrorInterceptor(rejection){
	    if (rejection.status == 401){
		$rootScope.obj = rejection;
		$rootScope.$broadcast(MESSAGES_AUTH_CST.authExpired, "Vous devez vous reconnecter");
	    }
	    return rejection;
	}	
    }

})();
