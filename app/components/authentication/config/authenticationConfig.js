(function(){

    'use strict';

    angular.module('pietro.authentication')
	.config(AuthenticationConfig);
    
    function AuthenticationConfig($stateProvider){
	$stateProvider
	    .state('root.login', {
		url: "/login",
		views:{
		    "main@": {
			templateUrl: "components/authentication/views/login.html",
			controller: 'UserLoginCtrl',
			controllerAs: 'loginCtrl'
		    }
		}
	    })
	    .state('root.logout', {
		url: '/',
		templateUrl: 'components/home/home.html'
	    });
    }

})();
