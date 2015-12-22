(function(){
    'use strict';

    angular.module('pietro.authentication', ['LocalStorageModule'])
	.constant('USER_AUTH_CST', {
	    token: 'userToken',
	    userData: 'userData',
	    profil: 'userProfil'
	})
	.constant('MESSAGES_AUTH_CST', {
	    authSuccess: 'authenticationSuccess',
	    authFail: 'authenticationFailure',
	    authLogOut: 'loggedOut',
	    authExpired: 'authExpired'
	})
    
})();

