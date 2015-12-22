(function() {

    'use strict';

    angular.module('parap.patient')
	.controller('PatientCtrl', PatientCtrl);

    //PatientCtrl.$inject = ['$state'];

    function PatientCtrl($state, $rootScope, PatientFactory, UserAuthFactory){
	var vm = this;
	vm.ctname = "PatientCtrl";	
	//$state.go('root.patient.list');

	vm.patients = {};
	vm.auth = UserAuthFactory;

	PatientFactory.getAll().then(
	    function(response){
		vm.patients = response.data.data;
	    }
	);

	vm.deletePatient = function(id){
	    PatientFactory.remove(id).then(function(response){
		vm.patients = response.data.data;
		$rootScope.$broadcast('information', 'Patient supprimé');
	    })
	};

	vm.test = function(id){
	    vm.result = id;
	    $state.go('root.patient.patient', {id:  id });
	}

	vm.obj = $rootScope.obj;
    }

})();
