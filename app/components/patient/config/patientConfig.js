(function(){
    'use strict';

    angular.module('parap.patient')
	.config(PatientConfig);

    function PatientConfig($stateProvider){
	$stateProvider
	    .state('root.patient', {
		url : "/patient",
		views: {
		    "main@": { templateUrl: "components/patient/index.html",
			       controller: "PatientCtrl",
			       controllerAs: "patientctrl"
			     }
		}
	    })
	    .state('root.patient.create', {
		url: "/create",
		templateUrl: "components/patient/views/create.html",
		controller: "CreatePatientCtrl",
		controllerAs: "ctrl"
	    })
	    .state('root.patient.list', {
		url: "/list",
		templateUrl: "components/patient/views/list.html",
		controller: "PatientCtrl",
		controllerAs: "patientCtrl"		
	    });
    }

})();
