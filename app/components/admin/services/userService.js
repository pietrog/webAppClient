(function(){

    'use strict';

    angular.module('AdminConsole')
	.factory('User', function($http){

	    var userFactory = {
		create: createUser,
		get: getUser,
		delete: deleteUser,
		addModuleToUser: addModuleToUser
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
	    function addModuleToUser(userID, modulesName){
		var data = { id: userID, modules: modulesName };
		return $http.patch('/users/updateUserModules', data);
	    }

	});

})()
