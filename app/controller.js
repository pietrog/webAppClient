(function(){
    'use strict';

    angular.module('parap')
	.controller('ParapCtrl', ParapCtrl);



    //ParapCtrl.$inject = ['$window', 'LocalStorageModule'];
    function ParapCtrl($rootScope,
		       $http,
		       $window,
		       localStorageService,
		       MESSAGES_AUTH_CST
		      ){
	var vm = this;
	vm.messages = [];
	
	$rootScope.$on(MESSAGES_AUTH_CST.authSuccess, function(event, arg){
	    vm.messages.push({ class: "alert alert-success", event: arg.name + " est maintenant connecte" });
	});
	$rootScope.$on(MESSAGES_AUTH_CST.authFail, function(event, arg){
	    vm.messages.push({ class: "alert alert-success", event: "Echec de connection" });
	});
	$rootScope.$on(MESSAGES_AUTH_CST.authLogOut, function(event, arg){
	    vm.messages.push({ class: "alert alert-warning", event: arg + " deconnecte" });
	});


	$rootScope
	    .$on('information', function(event, arg){
		vm.messages.push({ class: "alert alert-success", event: arg });
	    })
	$rootScope
	    .$on('error', function(event, arg){
		vm.messages.push({ class: "alert alert-danger", event: arg });
	    });



	if (!localStorageService.isSupported){
	    vm.errorMessage = "Web storage is not available through your browser.";
	}
	
    }
})();
