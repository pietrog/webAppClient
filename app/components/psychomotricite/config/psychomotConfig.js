(function(){
    'use strict';

    angular.module('psychomotricite')
	.config(PsychomotConfig);

    function PsychomotConfig($stateProvider){
	$stateProvider
	    .state('root.psychomotricite', {
		url: 'psychomotricite',
		views: {
		    "main@": { templateUrl: "components/psychomotricite/index.html",
			       //controller: "PsychomotCtrl",
			       //controllerAs: "psychomotCtrl"
			     }
		}
		
	    })
    }
    
})();
