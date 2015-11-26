(function(){
    'use strict';

    angular.module('pietro.authentication')
	.controller('UserLoginCtrl', UserLoginCtrl);

    //UserLoginCtrl.$inject = ['AuthenticationFactory'];
    function UserLoginCtrl($rootScope,
			   AuthenticationFactory,
			   MESSAGES_AUTH_CST
			  ){
	var vm = this;

	vm.credentials = {};

	vm.login = function(){
	    AuthenticationFactory.login(vm.credentials).then(
		function(response){
		    $rootScope.$broadcast(MESSAGES_AUTH_CST.authSuccess, userData);
		    vm.result = response;
		},
		function(response){
		    $rootScope.$broadcast(MESSAGES_AUTH_CST.authFail, userData);
		}
	    );
	}
	
    }
})();
