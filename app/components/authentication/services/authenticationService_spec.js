'use strict';

describe('Authentication service tests' , function(){
    var $httpBackend,
	authentication,
	postHandler,
	bis,
	localStorageService,
	$rootScope,
	$q;
    
    beforeEach(module('pietro.authentication'));
    beforeEach(module('LocalStorageModule'));
    beforeEach(inject(function($injector, _$rootScope_, _$q_){
	$httpBackend = $injector.get('$httpBackend');
	authentication = $injector.get('AuthenticationFactory');
	localStorageService = $injector.get('localStorageService');
	$httpBackend.when('POST', "/authenticate", { name: "pietro", password: "silvio"})
	    .respond({ success : true, message : "Authentication successed ! ", token: "XXX123"});
	$httpBackend.when('POST', "/authenticate", { name: "pietrus", password: "silvio"})
	    .respond({ success : false, message: 'User not found !!'});
    }));

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
	expect(result.token).toBe("XXX123");
	expect(status).toBe(200);
	expect(localStorageService.get('token')).toBe("XXX123");
    });

    it ('should log out after being logged in', function(){
	authentication.login({ name: "pietro", password: "silvio"});
	$httpBackend.flush();
	expect(localStorageService.get('token')).toBe("XXX123");
	authentication.logout();
	expect(localStorageService.get('token')).toBe(null);
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
	expect(result.message).toMatch("not found");
    });

    it ('should save the token in the localstorage', function(){
	authentication.login({ name: "pietro", password: "silvio"});
	$httpBackend.flush();
	expect(localStorageService.get('token')).toBe("XXX123");
    });

});

