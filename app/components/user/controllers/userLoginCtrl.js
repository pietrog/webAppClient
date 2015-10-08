(function(){
    'use strict';

    angular.module('parap.user')
	.controller('UserLoginCtrl', UserLoginCtrl);

    //UserLoginCtrl.$inject = ['AuthenticationFactory'];
    function UserLoginCtrl($rootScope, AuthenticationFactory){
	var vm = this;

	vm.credentials = {};

	vm.login = function(){
	    AuthenticationFactory.login(vm.credentials).then(
		function(response){
		    vm.result = response;
		    $rootScope.$broadcast('information', 'Authentification de l\'utilisateur: '+response.config.data.name);
		},
		function(response){
		    $rootScope.$broadcast('error', 'Echec de l\'authentification: '+response.data.data);
		}
	    );
	}
	
    }
})();
