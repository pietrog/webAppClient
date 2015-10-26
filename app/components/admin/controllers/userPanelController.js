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
		vm.result = response.data;
	    });

	ModuleFactory.get().then(function(response){
	    vm.listModules = response.data;
	});
	
	vm.createUser = function(){
	    vm.result = "ok"
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

	vm.addModuleToUser = function(userID, modName){
	    //first send the action to the server
	    User.addModuleToUser(userID, modName)
		.then(function(res){
		    if (res.data.success)
			vm.users[userID].profile.module.push({name: modName});
		    else
			vm.result = "failure...";
		});
	}

	vm.removeModuleFromUser = function(userID, modName){
	    User.deleteModuleFromUser(userID, modName).then(
		function(res){
		    if (res.data.success){
			/******************/
			//@TODO optimize it: remove the module if we find it

			var pos = 0;			
			vm.users[userID].profile.module.forEach(function(curr, idx, arr){
			    if (curr.name == modName) {
				pos = idx;
				return;
			    }
			})
			vm.users[userID].profile.module.splice(pos, 1);
			/******************/
								
			vm.result = "SUCCESS !! ";
		    }
		    else
			vm.result = res.data.success;
		}
	    )
	}

    }
    
})();
