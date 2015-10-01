(function(){

    'use strict';
    
    // Declare app level module which depends on views, and components
    angular.module('parap', ['ui.router', 'parap.home', 'parap.patient', 'parap.user', 'LocalStorageModule']);

    angular.module('parap')
    	.config(config);

    //function authenticationInterceptor(
    
    function config($stateProvider, $urlRouterProvider, $httpProvider, localStorageServiceProvider ){
	$urlRouterProvider.otherwise("/home");
	localStorageServiceProvider.setPrefix('parap');
	localStorageServiceProvider.setStorageType('sessionStorage');

	$stateProvider
	    .state('root', {
		url: '',
		abstract: true,
		views: {
		    "header": { templateUrl: "views/header.html" },
		    "footer": { templateUrl: "views/footer.html" },
		    "infobar": { templateUrl: "views/infobar.html", controller: "ParapCtrl", controllerAs: "ctrl" }
		}
	    });
    }

})();
