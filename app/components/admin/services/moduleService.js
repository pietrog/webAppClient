(function(){

    'use strict';

    angular.module('AdminConsole')
	.factory('ModuleFactory', function($http){
	    var moduleFact = {
		create: CreateModule,
		get: getAll,
		delete: removeModule,
		update: patchModule
	    };


	    return moduleFact;


	    function CreateModule(moduleData){
		return $http.post('/modules/add', moduleData);
	    }

	    function getAll(){
		return $http.get('/modules/list');
	    }

	    function removeModule(id){
		return $http.delete('/modules/module/'+id);
	    }

	    function patchModule(data){
		return $http.patch('/modules/update', data);
	    }
	});
})()
