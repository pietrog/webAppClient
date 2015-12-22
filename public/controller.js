(function(){
    'use strict';

    angular.module('parap')
	.controller('ParapCtrl', ParapCtrl);



    //ParapCtrl.$inject = ['$window', 'LocalStorageModule'];
    function ParapCtrl($rootScope,
		       $http,
		       $window,
		       localStorageService,
		       AuthenticationFactory,
		       MESSAGES_AUTH_CST,
		       UserAuthFactory,
		       InfoBarFactory
		      ){
	var vm = this;
	vm.ctname = "ParapCtrl";
	vm.infobar = InfoBarFactory;
	vm.user = UserAuthFactory;
	vm.auth = AuthenticationFactory;

	//@TODO: on place le flag init pour ne pas initialiser plusieurs meme methode "on" sur le rootScope
	//en effet, si deux controllers ParapCtrl sont initialises, sans le flag, chaque message sera duplique
	if (!$rootScope.init){
	    $rootScope.$on(MESSAGES_AUTH_CST.authSuccess, function(event, arg){
		InfoBarFactory.addSuccess(arg + " est maintenant connecte");
		//vm.messages.push({ class: "alert alert-success", event: arg.name + " est maintenant connecte" });
	    });

	    $rootScope.$on(MESSAGES_AUTH_CST.authFail, function(event, arg){
		InfoBarFactory.addSuccess("Echec de connection");
		//vm.messages.push({ class: "alert alert-success", event: "Echec de connection" });
	    });
	    $rootScope.$on(MESSAGES_AUTH_CST.authLogOut, function(event, arg){
		InfoBarFactory.addWarning(arg + " deconnecte");
		//vm.messages.push({ class: "alert alert-warning", event: arg + " deconnecte" });
	    });

	    $rootScope.$on(MESSAGES_AUTH_CST.authExpired, function(event, arg){
		InfoBarFactory.addDanger(arg);
		//vm.messages.push({ class: "alert alert-danger", event: arg });
		AuthenticationFactory.logout();
	    });

	    $rootScope
		.$on('information', function(event, arg){
		    InfoBarFactory.addWarning(arg);
		    //vm.messages.push({ class: "alert alert-success", event: arg });
		})
	    $rootScope
		.$on('error', function(event, arg){
		    InfoBarFactory.addDanger(arg);
		    //vm.messages.push({ class: "alert alert-danger", event: arg });
		});
	    $rootScope.init = true;
	}


	if (!localStorageService.isSupported){
	    vm.errorMessage = "Web storage is not available through your browser.";
	}
	
    }
})();
