(function(){
    'use strict';

    angular.module('pietro.authentication')
	.controller('UserLoginCtrl', UserLoginCtrl);

    //UserLoginCtrl.$inject = ['AuthenticationFactory'];
    function UserLoginCtrl($rootScope,
			   AuthenticationFactory,
			   UserAuthFactory,
			   MESSAGES_AUTH_CST
			  ){
	var vm = this;
	vm.ctname = "UserLoginCtrl";
	vm.credentials = {};

	vm.user = UserAuthFactory;
	vm.auth = AuthenticationFactory;


    }
})();
