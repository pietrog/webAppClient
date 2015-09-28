(function(){
    'use strict';

    angular.module('parap.user')
	.controller('UserCtrl', UserCtrl);

    function UserCtrl(User, testService){
	var vm = this;

	vm.compteur = testService.getCpt();
	
	vm.result = {};
	vm.users = {};
	vm.userData = {};
	    
	User.get().then(
	    function(response){
		vm.users = response.data;
		vm.result = response;
	    });
	
	vm.createUser = function(){
	    if (vm.userData.name){
		User.create(vm.userData).then(
		    function(response){
			vm.result = response.data;
			vm.successAlert = "Ajuote";
		    },
		    function(response){
			vm.failedAlert = "Echec";
		    });
	    }
	       
	}

	vm.deleteUser = function(name){
	    if (name){
		User.delete(name).then(
		    function(response){
			vm.users = response.data;
		    },
		    function(response){
			vm.result = response.data;
		    });
	    }
	};
	
	
	
    }
    
})();
