(function(){

    'use strict';

    angular.module('AdminConsole')
	.config(UserConfig);
    
    function UserConfig($stateProvider){
	$stateProvider
	    .state('root.adminConsole', {
		url: "/userConsole",
		abstract: true,
		views:{
		    "main@": {
			templateUrl: "components/admin/views/adminConsole.html"
		    }
		}
	    })
	    .state('root.adminConsole.active', {
		url: '/userConsoleActive',
		views:{
		    "userPanel@root.adminConsole":{
			templateUrl: "components/admin/views/userPanel.html",
			controller: 'UserPanelCtrl',
			controllerAs: 'userPanelCtrl'
		    },
		    "modulePanel@root.adminConsole":{
			templateUrl: "components/admin/views/modulePanel.html",
			controller: 'ModulePanelCtrl',
			controllerAs: 'modulePanelCtrl'
		    }
		}
	    });
    }

})();
