(function(){
    'use strict';

    angular.module('parap.user')
	.controller('parap.UserCtrl', UserCtrl);

    function UserCtrl($http, User){
	var vm = this;

	vm.userData = {};
	    
	User.get()
	    .success(function(data){
		vm.users = data;
	    });
	
	vm.createUser = function(){
	    if (vm.userData.name){
		User.create(vm.userData)
		    .success(function(data){
			vm.result = data;
		    });
	    }
	       
	}
	
	
	
    }
    
})();
