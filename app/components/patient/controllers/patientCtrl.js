(function() {

    'use strict';

    angular.module('parap.patient')
	.controller('PatientCtrl', PatientCtrl);

    //PatientCtrl.$inject = ['$state'];

    function PatientCtrl($state, PatientFactory){
	var vm = this;

	$state.go('root.patient.list');

	vm.patients = {};

	PatientFactory.getAll().then(function(response){
	    vm.patients = response.data.data;
	});

	vm.deletePatient = function(id){
	    PatientFactory.remove(id).then(function(response){
		vm.patients = response.data.data;
	    })
	};
    }

})();
