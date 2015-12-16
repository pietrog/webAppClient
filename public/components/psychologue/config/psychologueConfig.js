(function(){
    'use strict';

    angular.module('psychologue')
	.config(PsychomotConfig);

    function PsychomotConfig($stateProvider){
	$stateProvider
	    .state('root.psychologue', {
		url: '/psychologue',
		views: {
		    "main@": { templateUrl: "components/psychologue/index.html",
			       //controller: "PsychomotCtrl",
			       //controllerAs: "psychomotCtrl"
			     }
		}
		
	    })
	    .state('root.psychologue.pattern', {
		url: '/pattern',
		templateUrl: "components/psychologue/views/pattern.html",
		controller: "PatternCtrl",
		controllerAs: "patternctrl"
	    })
    }
    
})();
