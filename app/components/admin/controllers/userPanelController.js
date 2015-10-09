(function(){
    'use strict';

    angular.module('AdminConsole')
	.controller('UserPanelCtrl', UserCtrl);

    function UserCtrl($rootScope, User, ModuleFactory){
	var vm = this;

	vm.typeUsers = ["admin", "patient", "praticien"];
	vm.users = {};
	vm.userData = {};
	vm.listModules = [];
	
	User.get().then(
	    function(response){
		vm.users = response.data;
		//vm.result = response;
	    });

	ModuleFactory.get().then(function(response){
	    vm.listModules = response.data;
	});
	
	vm.createUser = function(){
	    if (vm.userData.login){
		vm.userData.profile = { type: "praticien" };
		User.create(vm.userData).then(
		    function(response){			
			$rootScope.$broadcast('information', 'Utilisateur ajouté');
			User.get().then(
			    function(response){
				vm.users = response.data;
				vm.result = response;
			    });
			
		    },
		    function(response){
			$rootScope.$broadcast('error', 'Echec de l\'ajout de l\'utilisateur: '+ response.data.data);
		    });
	    }
	       
	}

	vm.deleteUser = function(userID){
	    if (userID){
		User.delete(userID).then(
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

	vm.changeModule = function(userlogin, moduleName){
	    vm.result = userlogin + ' - ' + moduleName;
	}
	
    }
    
})();
