(function() {

    'use strict';

    angular.module('parap.patient')
	.controller('PatientCtrl', PatientCtrl);

    //PatientCtrl.$inject = ['$state'];

    function PatientCtrl(PatientFactory, UserAuthFactory){
	var vm = this;

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
    }

})();
