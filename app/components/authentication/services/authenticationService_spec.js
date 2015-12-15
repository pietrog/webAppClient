'use strict';

describe('Authentication service tests' , function(){
    var $httpBackend,
	authentication,
	USER_AUTH_CST,
	localStorageService,
	$rootScope,
	$q;

    //load authentication module
    beforeEach(module('ui.router'));
    beforeEach(module('pietro.authentication'));
    //load localstorage module
    beforeEach(module('LocalStorageModule'));
    //build the response to post for authentication
    beforeEach(inject(function($injector, _$rootScope_, _$q_){
	authentication = $injector.get('AuthenticationFactory');
	USER_AUTH_CST = $injector.get('USER_AUTH_CST');
	localStorageService = $injector.get('localStorageService');

	$httpBackend = $injector.get('$httpBackend');
	$httpBackend.when('POST', "/authenticate", { name: "pietro", password: "silvio"})
	    .respond({ success : true,
		       data: {
			   message : "Authentication successed ! ",
			   token: "XXX123"}
		     }
		    );
	$httpBackend.when('POST', "/authenticate", { name: "pietrus", password: "silvio"})
	    .respond({ success : false,
		       data: {
			   message: 'User not found !!'
		       }
		     });
    }));

    //Check that we never have a pending http request 
    afterEach(function(){
	$httpBackend.verifyNoOutstandingExpectation();
	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it ('should log in with pietro', function(){

	var result, status;
	
	$httpBackend.expectPOST('/authenticate');

	authentication.login({ name: "pietro", password: "silvio"}).then(
	    function(response){
		result = response.data;
		status = response.status;
	    }
	);

	$httpBackend.flush();
	expect(result.success).toBe(true);
	expect(status).toBe(200);
	expect(localStorageService.get(USER_AUTH_CST.token)).toBe("XXX123");
    });

    it ('should log out after being logged in', function(){
	authentication.login({ name: "pietro", password: "silvio"});
	$httpBackend.flush();
	expect(localStorageService.get(USER_AUTH_CST.token)).toBe("XXX123");
	authentication.logout();
	expect(localStorageService.get(USER_AUTH_CST.token)).toBe(null);
    });
    
    it ('should not log in with pietrus because pietrus does not exist', function(){

	var result;
	
	$httpBackend.expectPOST('/authenticate')
	authentication.login({ name: "pietrus", password: "silvio"}).then(
	    function(response){
		result = response.data;
	    }
	);
	$httpBackend.flush();
	expect(result.success).toBe(false);
	expect(result.data.message).toMatch("not found");
    });

});

