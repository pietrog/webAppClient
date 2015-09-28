(function(){

    'use strict';

    angular.module('parap.user')
	.config(UserConfig);
    
    function UserConfig($stateProvider){
	$stateProvider
	    .state('user-login', {
		url: "/login",
		templateUrl: "components/user/views/login.html",
		controller: 'UserLoginCtrl',
		controllerAs: 'userCtrl'

	    })
	    .state('user-logout', {
		url: '/',
		templateUrl: 'components/home/home.html'
	    })
	    .state('user-signup', {
		url: "/signup",
		templateUrl: 'components/user/views/signup.html',
		controller: 'UserCtrl',
		controllerAs: 'userCtrl'
	    })
	    .state('user-list', {
		url: "/list",
		templateUrl: 'components/user/views/list.html',
		controller: 'UserCtrl',
		controllerAs: 'userCtrl'
	    });
    }

})();
