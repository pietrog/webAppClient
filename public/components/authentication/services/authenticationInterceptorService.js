(function(){

    'use strict';

    angular.module('pietro.authentication')
	.factory('AuthenticationInterceptorFactory', AuthenticationInterceptorFactory);

    function AuthenticationInterceptorFactory($q, localStorageService, UserAuthFactory){

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
	    return response;
	}
	
	function ResponseErrorInterceptor(rejection){
	    
	    return rejection;
	}
	
    }

})();
