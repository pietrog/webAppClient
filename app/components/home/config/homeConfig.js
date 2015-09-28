(function(){
    'use strict';

    angular.module('parap.home')
	.config(Config);
    
    function Config($stateProvider){
	$stateProvider
	    .state('home', {
		url: "/home",
		templateUrl: "components/home/home.html"
	    })
	    .state('home.acceuil', {
		url: "/accueil",
		templateUrl: "components/home/accueil.html"
	    })
	    .state("home.informations", {
		url: "/informations",
		templateUrl: "components/home/informations.html",
		controller: "HomeCtrl",
		controllerAs: "ctrl"
	    });
    };

})();
