(function(){
    'use strict';

    angular.module('parap.user')
	.controller('UserCtrl', UserCtrl);

    function UserCtrl($rootScope, User, testService){
	var vm = this;

	vm.compteur = testService.getCpt();
	
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
			$rootScope.$broadcast('information', 'Utilisateur ajouté');
		    },
		    function(response){
			$rootScope.$broadcast('error', 'Echec de l\'ajout de l\'utilisateur: '+ response.data.data);
		    });
	    }
	       
	}

	vm.deleteUser = function(name){
	    if (name){
		User.delete(name).then(
		    function(response){
			vm.users = response.data;
			$rootScope.$broadcast('information', 'Utilisateur supprimé'+response.data);
		    },
		    function(response){
			vm.result = response.data;
			$rootScope.$broadcast('error', 'Echec de suppression: '+response.data);
		    });
	    }
	};
	
	
	
    }
    
})();
