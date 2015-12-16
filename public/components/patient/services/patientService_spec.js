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
	    .respond({ success : true, message : "Authentication successed ! ", token: "XXX123"});
	$httpBackend.when('POST', "/authenticate", { name: "pietrus", password: "silvio"})
	    .respond({ success : false, message: 'User not found !!'});
    }));

    //Check that we never have a pending http request 
    afterEach(function(){
	$httpBackend.verifyNoOutstandingExpectation();
	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it ('should do nothing right now...', function(){

	var result, status;
    });

});
