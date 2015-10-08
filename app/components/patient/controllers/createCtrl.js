(function(){

    'use strict';

    angular.module('parap.patient')
	.controller('CreatePatientCtrl', CreatePatientCtrl);


    function CreatePatientCtrl($rootScope, PatientFactory){
	var vm = this;


	vm.patient = {
	};

	vm.createPatient = function(){
	    if (vm.patient.firstname){
		PatientFactory.create(vm.patient).then(
		    function(response){
			$rootScope.$broadcast('information', 'Patient ' + response.success + ' créé.');
		    },
		    function(err){
			$rootScope.$broadcast('error', 'Echec de la création du patient: ' + err.data);
		    })
	    }
	}

	vm.cleanForm = function(){
	    vm.patient = {};
	}
    }

})();
