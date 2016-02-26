(function(){

    'use strict';

    /**
     * Give to the user the possibility to manage object related to a patient, like files, or just notes
     * Behing, everything is stored in the database, via mongoose, see related schema
     */
    angular.module('parap.patient')
	.factory('DataPatientFactory', function($http){

	    var factory = {
		getListOfObjectFromPatientID: getListOfObjectFromPatientID,
		addObjectToUserWithID: addObjectToUserWithID,
		removeObjectFromUserWithID: removeObjectFromUserWithID,
		getObjectFromUserWithID: getObjectWithID
	    };

	    return fact;

	    function getListOfObjectFromPatientID(patientID){
	    }

	    function addObjectToUserWithID(patientID, object){
	    }

	    function removeObjectFromUserWithID(patientID, objectID){
	    }

	    function getObjectWithID(patientID, objectID){
	    }
	 
	});

})();
