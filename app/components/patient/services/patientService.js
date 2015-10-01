(function(){
    'use strict';

    angular.module('parap.patient')
	.factory('PatientFactory', function($http){
	    var fact = {
		create: createPatient,
		getAll: getAllPatients,
		remove: removePatient,
		update: updatePatient
	    };

	    return fact;


	    function createPatient(data){
		return $http.post('/patients/create', data);
	    }

	    function getAllPatients(){
		return $http.get('/patients/all');
	    }

	    function removePatient(id){
		return $http.delete('/patients/patient/'+id);
	    }

	    function updatePatient(data){
		return $http.patch('/patients/update', data);
	    }
	    
	});


    
    
})();
