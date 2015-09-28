(function(){
    'use strict';

    angular.module('parap.user')
	.controller('UserLoginCtrl', UserLoginCtrl);

    UserLoginCtrl.$inject = ['AuthenticationFactory'];
    function UserLoginCtrl(Authentication){
	var vm = this;

	vm.credentials = {};

	vm.login = function(){
	    Authentication.login(vm.credentials).then(
		function(response){
		    vm.result = response;
		}
	    );
	}
	
    }
})();
