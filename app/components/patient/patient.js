(function(){
    'use strict';

    angular.module('parap.patient', ['ui.router']);

    angular.module('parap.patient')
	.config(PatientConfig);


    function PatientConfig($stateProvider){
	$stateProvider
	    .state('patient', {
		url : "/patient",
		templateUrl: "components/patient/index.html"
	    })
	    .state('patient.create', {
		url: "/create",
		templateUrl: "components/patient/rest/create.html",
		controller: "CreatePatientCtrl",
		controllerAs: "ctrl"
	    })
	    .state('patient.list', {
		url: "/list",
		templateUrl: "components/patient/rest/list.html",
		controller: "PatientCtrl",
		controllerAs: "patientCtrl"		
	    });
    }

})();
