(function(){

    'use strict';

    angular.module('pietro.authentication')
	.config(AuthenticationConfig);
    
    function AuthenticationConfig($stateProvider){
	$stateProvider
	    .state('root.logout', {
		url: '/',
		templateUrl: 'components/home/home.html'
	    });
    }

})();
