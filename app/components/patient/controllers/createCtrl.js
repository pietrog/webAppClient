(function(){

    'use strict';

    angular.module('parap.patient')
	.controller('CreatePatientCtrl', CreatePatientCtrl);


    function CreatePatientCtrl(){
	var vm = this;

	vm.firstname = "Prenom";
	vm.lastname = "Nom de famille";
	vm.address = "Adresse";
	vm.phone = "Téléphone";
    }

})();
