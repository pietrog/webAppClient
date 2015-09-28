(function(){

    'use strict';

    angular.module('parap.user')
	.factory('User', function($http){
	    return{
		create: function(data){
		    return $http.post('/users/add', data);
		},
		get: function(){
		    return $http.get('/users/list');
		},
		delete: function(name){
		    return $http.delete('/users/user/' + name);
		}
	    }
	});

})()
