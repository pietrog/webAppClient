(function(){
    'use strict';

    angular.module('parap.patient')
	.controller('DataPatientCtrl', DataPatientCtrl);

    function DataPatientCtrl($stateParams, PatientFactory){
	var vm = this;
	vm.ctname = "DataPatientCtrl";	
	PatientFactory.getByID($stateParams.id).then(
	    function(response){
		vm.current = response.data.data;
	    });

	vm.id = $stateParams.id;
	
    }
})();
