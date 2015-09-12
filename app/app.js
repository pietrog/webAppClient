(function(){

    'use strict';
    
    // Declare app level module which depends on views, and components
    angular.module('parap', ['ui.router', 'parap.home', 'parap.patient']);

    angular.module('parap')
    	.config(config);
    
    function config($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/home");
    }

})();
