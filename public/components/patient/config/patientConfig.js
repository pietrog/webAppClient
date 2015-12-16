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
		controllerAs: "patientCtrl",
		//resolve: checkIsConnected
	    })
	    .state('root.patient.patient', {
		url: "/patient/:id",
		templateUrl: "components/patient/views/DataPatient.html",
		controller: "DataPatientCtrl",
		controllerAs: "dataPatientCtrl"
	    })
    }


    function checkIsConnected($q, $location){
	var defered = $q.defer();
	
	if (false){
	    defered.reject("no access");
	    $location.url('/home');
	}
	else{
	    defered.resolve("access granted !");
	}
    }
    

})();
