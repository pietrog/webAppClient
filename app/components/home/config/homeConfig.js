(function(){
    'use strict';

    angular.module('parap.home')
	.config(Config);
    
    function Config($stateProvider){
	$stateProvider
	    .state('root.home', {
		url: "/home",
		views: {
		    "main@" : { templateUrl: "components/home/home.html" }
		}
	    })
	    .state('root.home.acceuil', {
		url: "/accueil",
		templateUrl: "components/home/views/accueil.html" 
	    })
	    .state("root.home.informations", {
		url: "/informations",
		templateUrl: "components/home/views/informations.html",
		controller: "HomeCtrl",
		controllerAs: "ctrl"
	    });
    };
    
})();
