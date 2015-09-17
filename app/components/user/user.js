(function(){

    'use strict';

    angular.module('parap.user', ['ui.router']);

    angular.module('parap.user')
	.config(UserConfig);

    function UserConfig($stateProvider){
	$stateProvider
	    .state('user-login', {
		url: "/login",
		templateUrl: "components/user/login.html",
		controller: 'parap.UserCtrl',
		controllerAs: 'userCtrl'

	    })
	    .state('user-signup', {
		url: "/signup",
		templateUrl: 'components/user/signup.html',
		controller: 'parap.UserCtrl',
		controllerAs: 'userCtrl'
	    })
	    .state('user-list', {
		url: "/list",
		templateUrl: 'components/user/list.html',
		controller: 'parap.UserCtrl',
		controllerAs: 'userCtrl'
	    });
    }
})();
