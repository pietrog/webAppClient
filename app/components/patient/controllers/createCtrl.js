(function(){

    'use strict';

    angular.module('parap.patient')
	.controller('CreatePatientCtrl', CreatePatientCtrl);


    function CreatePatientCtrl($rootScope, PatientFactory){
	var vm = this;

	vm.patient = {};

	vm.createPatient = function(){
	    if (vm.patient.firstname){
		PatientFactory.create(vm.patient).then(function(response){
		    $rootScope.$broadcast('information', 'Patient créé.');
		})
	    }
	}
	vm.firstname = "Prenom";
	vm.lastname = "Nom de famille";
	vm.address = "Adresse";
	vm.phone = "Téléphone";
    }

})();
