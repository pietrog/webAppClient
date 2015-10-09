(function(){

    'use strict';

    angular.module('AdminConsole')
	.factory('User', function($http){
	    return{
		create: function(data){
		    return $http.post('/users/add', data);
		},
		get: function(){
		    return $http.get('/users/list');
		},
		delete: function(id){
		    return $http.delete('/users/user/' + id);
		}
	    }
	});

})()
