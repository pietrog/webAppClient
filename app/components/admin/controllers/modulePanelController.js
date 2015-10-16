(function(){
    'use strict';

    angular.module('AdminConsole')
	.controller('ModulePanelCtrl', UserCtrl);

    function UserCtrl($rootScope, ModuleFactory){
	var vm = this;

	vm.listModules = [];
	vm.newModule = {};
	
	vm.createModule = function(){
	    vm.listModules = [{name: "coucou", description: "blabla", isActive: false}];
	    if (vm.newModule){
		ModuleFactory.create(vm.newModule)
		    .then(function(response){
			vm.listModules = response.data.data;
			vm.result = response;
		    });
	    }
	    ModuleFactory
	}

	vm.deleteModule = function(id){
	    if (id){
		ModuleFactory.delete(id).then(
		    function(response){
			vm.result = response;
		    });
	    }
	}

	ModuleFactory.get().then(
	    function(response){
		vm.listModules = response.data;
		vm.result = response;
	    });

    }
    
})();