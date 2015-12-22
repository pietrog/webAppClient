(function(){

    'use strict';

    angular.module('psychologue')
	.controller('PatternCtrl', PatternCtrl);

    function PatternCtrl(){
	var vm = this;
	vm.ctname = "PatternCtrl";	
	vm.lists = [];
	
	vm.addList = function(){
	    vm.lists.push(["opt 1", "opt 2"]);
	};
    }
    
})();
