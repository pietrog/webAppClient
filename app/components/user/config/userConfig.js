(function(){

    'use strict';

    angular.module('parap.user')
	.config(UserConfig);
    
    function UserConfig($stateProvider){
	$stateProvider
	    .state('root.user-login', {
		url: "/login",
		views:{
		    "main@": {
			templateUrl: "components/user/views/login.html",
			controller: 'UserLoginCtrl',
			controllerAs: 'userCtrl'
		    }
		}
	    })
	    .state('user-logout', {
		url: '/',
		templateUrl: 'components/home/home.html'
	    })
	    .state('root.user-signup', {
		url: "/signup",
		views:{
		    "main@": {
			templateUrl: "components/user/views/signup.html",
			controller: 'UserCtrl',
			controllerAs: 'userCtrl'
		    }
		}
	    })
	    .state('root.user-list', {
		url: "/userlist",
		views:{
		    "main@": {
			templateUrl: "components/user/views/list.html",
			controller: 'UserCtrl',
			controllerAs: 'userCtrl'
		    }
		}
	    });
    }

})();
