(function() {

    'use strict';

    angular.module('parap.patient')
	.controller('PatientCtrl', PatientCtrl);

    PatientCtrl.$inject = ['$state'];

    function PatientCtrl($state){
	var vm = this;

	$state.go('root.patient.list');

	vm.list = [
	    { "firstname" : "Pierre",
	      "lastname" : "Gaulard" },
	    { "firstname" : "Aurelie",
	      "lastname" : "Graine" }
	];
    }

})();
