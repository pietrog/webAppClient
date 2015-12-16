(function(){

    'use strict';

    angular.module('AdminConsole')
	.factory('User', function($http){

	    var userFactory = {
		create: createUser,
		get: getUser,
		delete: deleteUser,
		addModuleToUser: addModuleToUser,
		deleteModuleFromUser: deleteModuleFromUser
	    };
	    
	    return userFactory;

	    
	    function createUser(data){
		return $http.post('/users/add', data);
	    }

	    function getUser(){
		return $http.get('/users/list');
	    }
	    function deleteUser(id){
		return $http.delete('/users/user/' + id);
	    }
	    function addModuleToUser(userID, modName){
		var data = { id: userID, module: modName };
		return $http.patch('/users/updateUserModules', data);
	    }
	    function deleteModuleFromUser(userID, modName){
		var data = { id: userID, module: modName };
		return $http.patch('/users/deleteUserModule', data);
	    }

	});

})()
