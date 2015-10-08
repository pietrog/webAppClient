(function(){
    'use strict';

    angular.module('pietro.authentication', ['LocalStorageModule'])
	.constant('USER_AUTH', {
	    token: 'userToken',
	    userName: 'userName'
	});
    
})();

